import { Imetadata } from "../interfaces/Imetadata";

export type Responsetype<t>= {
  resulta:number;
  metadata: Imetadata;
  data: t[];
}