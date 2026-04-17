'use client'; 

import { ShoppingCart, Trash2, Loader2, Check } from 'lucide-react';
import { useState } from 'react';

export default function WishItem({ wishedproduct, onRemove, addToCart }: any) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const onAddToCartClick = async () => {
    setLoading(true);
    await addToCart(); 
    setLoading(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 transition-all hover:shadow-md">
   
      <div className="flex items-center gap-4 w-full md:w-[40%]">
        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-gray-50 p-2">
          <img src={wishedproduct.imageCover} alt={wishedproduct.title} className="h-full w-full object-contain" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-gray-800 line-clamp-1">{wishedproduct.title}</h3>
          <p className="text-xs text-gray-400">{wishedproduct.category?.name}</p>
        </div>
      </div>


      <div className="w-full md:w-[15%] text-center py-2 md:py-0">
        <span className="text-base font-bold text-green-600">{wishedproduct.price} EGP</span>
      </div>

      <div className="w-full md:w-[15%] text-center py-2 md:py-0">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-[11px] font-bold text-green-600">
          <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span> In Stock
        </span>
      </div>

    
      <div className="flex items-center justify-end gap-3 w-full md:w-[25%] pt-4 md:pt-0">
        <button 
          onClick={onAddToCartClick}
          disabled={loading}
          className={`flex flex-1 md:flex-none items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-xs font-bold text-white transition-all active:scale-95 shadow-sm ${success ? 'bg-blue-600' : 'bg-green-600 hover:bg-green-700'}`}
        >
          {loading ? <Loader2 size={15} className="animate-spin" /> : success ? <Check size={15} /> : <ShoppingCart size={15} />}
          {success ? "Added!" : "Add to Cart"}
        </button>

        <button 
          onClick={() => onRemove(wishedproduct._id || wishedproduct.id)} 
          className="group flex h-10 w-10 items-center justify-center rounded-xl border border-gray-100 hover:bg-red-50"
        >
          <Trash2 size={18} className="text-gray-400 group-hover:text-red-500" />
        </button>
      </div>
    </div>
  );
}