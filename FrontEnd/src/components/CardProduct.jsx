const CardProduct = ({ name, description, roastLevel, flavorNote, image, origin }) => {
  return (
    <div className="bg-white rounded-lg p-4 flex flex-col">
      <img src={image} alt={name} className="w-full h-48 object-cover rounded-md mb-4" />
      <h2 className="text-xl font-semibold mb-2">{name}</h2>
      <p className="text-gray-600 text-sm mb-2">{description}</p>
      
      <div className="flex flex-wrap gap-2 mt-auto">
        <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded">{roastLevel}</span>
        <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded">{flavorNote}</span>
        <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded">{origin}</span>
      </div>
    </div>
  );
};

export default CardProduct;
