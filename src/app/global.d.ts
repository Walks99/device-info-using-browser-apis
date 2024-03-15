// global.d.ts or any other name you prefer
declare global {
    interface Navigator {
       userAgentData?: {
         brands: { brand: string; version: string }[];
         mobile: boolean;
         platform: string;
       };
    }
   }
   