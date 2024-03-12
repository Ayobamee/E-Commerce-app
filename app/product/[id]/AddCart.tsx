'use client'

import { AddCartType } from '@/types/AddCartType'

import { useCartStore } from '@/store'

export default function AddCart({
  name,
  id,
  image,
  unit_amount,
  quantity,
}: AddCartType) {
  const cartStore = useCartStore()

  return (
    <>
      <button
        onClick={() =>
          cartStore.addProduct({ name, id, image, unit_amount, quantity })
        }
        data-testid='Add to Cart'
        className='my-12 text-white py-2 px-6 font-medium rounded-md bg-teal-700'
      >
        Add to cart
      </button>
    </>
  )
}
