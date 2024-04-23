export type AddCartType = {
  reduce(arg0: (acc: any, item: any) => any, arg1: number): unknown
  name: string
  image: string
  id: string
  quantity?: number | 1
  unit_amount: number | null
}
