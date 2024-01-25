import { useGetProductsQuery } from '@/Redux/Api/ApiSlice';
import { setPriceRang, toggle } from '@/Redux/Features/Product/ProductSlice';
import { useAppSelector } from '@/Redux/Hooks';
import ProductCard from '@/components/ProductCard';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { IProduct } from '@/types/globalTypes';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export default function Products() {
  // const [data, setData] = useState<IProduct[]>([]);
  // useEffect(() => {
  //   fetch('./data?.data?.json')
  //     .then((res) => res.json())
  //     .then((data) => setData(data));
  // }, []);

  const { toast } = useToast();

  const {status, priceRange}= useAppSelector((state)=> state.product)
  const dispatch = useDispatch();

  const {data, isLoading, error}= useGetProductsQuery(undefined)
  //! Dummy Data

  // const status = true;
  // const priceRange = 100;

  //! **

  const handleSlider = (value: number[]) => {
    dispatch(setPriceRang(value[0]))
  };

  let productsData;

  if (status) {
    productsData = data?.data?.filter(
      (item: { status: boolean; price: number; }) => item.status === true && item.price < priceRange
    );
  } else if (priceRange > 0) {
    productsData = data?.data?.filter((item: { price: number; }) => item.price < priceRange);
  } else {
    productsData = data;
  }

  if (isLoading) {
    return ( 
      <div className='h-screen flex justify-center mx-auto items-center'>
         <button  className="bg-indigo-500 btn px-3 py-2 rounded" disabled>
         Data is isLoading...
  
</button>
     </div>
    )
  }

  return (
    <div className="grid grid-cols-12 max-w-7xl mx-auto relative ">
      <div className="col-span-3 z mr-10 space-y-5 border rounded-2xl border-gray-200/80 p-5 self-start sticky top-16 h-[calc(100vh-80px)]">
        <div>
          <h1 className="text-2xl uppercase">Availability</h1>
          <div onClick={()=> dispatch(toggle())} className="flex items-center space-x-2 mt-3">
            <Switch  id="in-stock" />
            <Label htmlFor="in-stock">In stock</Label>
          </div>
        </div>
        <div className="space-y-3 ">
          <h1 className="text-2xl uppercase">Price Range</h1>
          <div className="max-w-xl">
            <Slider
              defaultValue={[150]}
              max={150}
              min={0}
              step={1}
              onValueChange={(value) => handleSlider(value)}
            />
          </div>
          <div>From 0$ To {priceRange}$</div>
        </div>
      </div>
      <div className="col-span-9 grid grid-cols-3 gap-10 pb-20">
        {productsData?.map((product: IProduct) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
}
