type SuccessType = {
   response: {
      data: {
         data?: any;
         message: string;
      };
   };
};

type ErrorType = {
   response: {
      error: {
         message: string;
      };
   };
};
class Response {
   protected SuccessResponseHandler = ({ data, message }: { data?: any; message: string | null }) => {
      return {
         response: {
            data: {
               data,
               message,
            },
         },
      } as SuccessType;
   };

   protected ErrorResponseHandler = ({ message }: { message: string }) => {
      return {
         response: {
            error: {
               message,
            },
         },
      } as ErrorType;
   };
}
export default class LocalStorageQuery extends Response {
   private latency: number;
   private db: string;

   constructor(config: { collectionName: string; latency: number }) {
      super();
      this.db = config.collectionName;
      this.latency = config.latency || 0;
      this.getStore(config.collectionName);
   }

   /*------------------------private method--------------------*/
   private setStore = (db: string, data: any) => {
      localStorage.setItem(db, JSON.stringify(data));
   };

   private getStore = (db: string) => {
      if (!localStorage.getItem(db)) {
         this.setStore(db, []);
         return [];
      } else {
         return JSON.parse(localStorage.getItem(db) || "{}");
      }
   };

   /*------------------------public method--------------------*/
   public async create(item: { id?: number }) {
      try {
         await new Promise((resolve) => setTimeout(resolve, this.latency));
         if (!item) {
            throw { message: "payload must be provide!" };
         }
         item.id = Date.now();
         if (!item.id) {
            throw { message: "Invalid payload!" };
         }
         this.setStore(this.db, [...this.getStore(this.db), item]);
         return this.SuccessResponseHandler({ message: "item successfully created" });
      } catch (error: any) {
         throw this.ErrorResponseHandler({ message: error?.message || "create item error!" });
      }
   }

   public async deleteById(id: number) {
      try {
         await new Promise((resolve) => setTimeout(resolve, this.latency));
         if (typeof id !== "number") {
            throw { message: "id must be number type!" };
         }
         let items = this.getStore(this.db).filter((item: any) => item.id !== id);
         this.setStore(this.db, items);
         return this.SuccessResponseHandler({ message: "item successfully deleted" });
      } catch (error: any) {
         throw this.ErrorResponseHandler({ message: error?.message || "delete by id item error!" });
      }
   }

   public async updateById(id: number, item: any) {
      try {
         await new Promise((resolve) => setTimeout(resolve, this.latency));
         let updatedItems = this.getStore(this.db).map((element: any) => (element?.id === id ? { ...element, ...item } : element));
         this.setStore(this.db, updatedItems);
         return this.SuccessResponseHandler({ message: "item successfully updated" });
      } catch (error: any) {
         throw this.ErrorResponseHandler({ message: error?.message || "update by id item error!" });
      }
   }

   public async findById(id: number) {
      try {
         await new Promise((resolve) => setTimeout(resolve, this.latency));
         return this.SuccessResponseHandler({
            message: "item successfully fetched",
            data: this.getStore(this.db).find((item: any) => item?.id === id),
         });
      } catch (error: any) {
         throw this.ErrorResponseHandler({ message: error?.message || "find by id item error!" });
      }
   }

   public async find(query: any) {
      try {
         await new Promise((resolve) => setTimeout(resolve, this.latency));
         if (query) {
            for (const key in query) {
               return this.SuccessResponseHandler({
                  message: "item successfully fetched",
                  data: this.getStore(this.db).filter((item: any) => item[key] === query[key]),
               });
            }
         } else {
            return this.SuccessResponseHandler({
               message: "item successfully fetched",
               data: this.getStore(this.db),
            });
         }
      } catch (error: any) {
         throw this.ErrorResponseHandler({ message: error?.message || "find item error!" });
      }
   }

   public async search(query: any) {
      try {
         await new Promise((resolve) => setTimeout(resolve, this.latency));
         if (query) {
            for (const key in query) {
               return this.SuccessResponseHandler({
                  message: "items successfully searched",
                  data: this.getStore(this.db).filter((item: any) => {
                     return item[key].toLowerCase().includes(query[key].toLowerCase());
                  }),
               });
            }
         } else {
            return this.SuccessResponseHandler({
               message: "items successfully searched",
               data: this.getStore(this.db),
            });
         }
      } catch (error: any) {
         throw this.ErrorResponseHandler({ message: error?.message || "search item error!" });
      }
   }
}
