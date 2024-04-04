class Helper {
   setStore = (db: string, data: any) => {
      localStorage.setItem(db, JSON.stringify(data));
   };

   getStore = (db: string) => {
      if (!localStorage.getItem(db)) {
         this.setStore(db, []);
         return [];
      } else {
         return JSON.parse(localStorage.getItem(db) || "{}");
      }
   };
}

export default class LocalStorageQuery extends Helper {
   private latency: number;
   public db: string;
   constructor(config: { collectionName: string; latency: number }) {
      super();
      this.db = config.collectionName;
      this.latency = config.latency || 0;
      this.getStore(config.collectionName);
   }

   create = (item: any) => {
      return new Promise((resolve, reject) => {
         try {
            setTimeout(() => {
               item.id = Date.now();
               this.setStore(this.db, [...this.getStore(this.db), item]);
               resolve({ massage: "item successfully created" });
            }, this.latency);
         } catch (error) {
            setTimeout(() => {
               reject({ error });
            }, this.latency);
         }
      });
   };

   deleteById = (id: number) => {
      return new Promise((resolve, reject) => {
         try {
            setTimeout(() => {
               let items = this.getStore(this.db).filter((item: any) => item.id !== id);
               this.setStore(this.db, items);
               resolve({ massage: "item successfully deleted" });
            }, this.latency);
         } catch (error) {
            setTimeout(() => {
               reject({ error });
            }, this.latency);
         }
      });
   };

   updateById = (id: number, item: any) => {
      return new Promise((resolve, reject) => {
         try {
            setTimeout(() => {
               let updatedItems = this.getStore(this.db).map((element: any) => (element?.id === id ? { ...element, ...item } : element));
               this.setStore(this.db, updatedItems);
               resolve({ massage: "item successfully updated" });
            }, this.latency);
         } catch (error) {
            setTimeout(() => {
               reject({ error });
            }, this.latency);
         }
      });
   };

   findById = (id: number) => {
      return new Promise((resolve, reject) => {
         try {
            setTimeout(() => {
               resolve({
                  massage: "item successfully fetched",
                  data: this.getStore(this.db).find((item: any) => item?.id === id),
               });
            }, this.latency);
         } catch (error) {
            setTimeout(() => {
               reject({ error });
            }, this.latency);
         }
      });
   };

   find = (query: any) => {
      return new Promise((resolve, reject) => {
         try {
            setTimeout(() => {
               if (query) {
                  for (const key in query) {
                     resolve({
                        massage: "items successfully fetched",
                        data: this.getStore(this.db).filter((item: any) => item[key] === query[key]),
                     });
                  }
               } else {
                  resolve({
                     massage: "items successfully fetched",
                     data: this.getStore(this.db),
                  });
               }
            }, this.latency);
         } catch (error) {
            setTimeout(() => {
               reject({ error });
            }, this.latency);
         }
      });
   };

   search = (query: any) => {
      return new Promise((resolve, reject) => {
         try {
            setTimeout(() => {
               if (query) {
                  for (const key in query) {
                     resolve({
                        massage: "items successfully searched",
                        data: this.getStore(this.db).filter((item: any) => {
                           return item[key].toLowerCase().includes(query[key].toLowerCase());
                        }),
                     });
                  }
               } else {
                  resolve({
                     massage: "items successfully searched",
                     data: this.getStore(this.db),
                  });
               }
            }, this.latency);
         } catch (error) {
            setTimeout(() => {
               reject({ error });
            }, this.latency);
         }
      });
   };
}
