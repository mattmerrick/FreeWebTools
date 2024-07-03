import Image from 'next/image';

const CalculatorBar = () => {
  return (
    <div className="max-w-5xl mx-auto px-8 py-16 md:py-32 text-center">
      <h2 className="text-center font-extrabold text-3xl md:text-5xl tracking-tight mb-12 md:mb-20">
        We Found the Perfect Tools to Build. <br />High Search Volume, Low DR.
      </h2>
      <p className="mb-12">Making it easy for anyone to grow.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card p-4 border rounded-lg shadow-md">
          <Image 
            src="https://ik.imagekit.io/under2k/amazing.JPG?updatedAt=1716003454453" 
            alt="Example" 
            width={500} 
            height={500} 
            className="w-full h-auto rounded-lg mb-4" 
            priority={true}
          />
          <p className="text-lg font-semibold">Image Description 1</p>
        </div>
        <div className="card p-4 border rounded-lg shadow-md">
          <Image 
            src="https://ik.imagekit.io/under2k/amazing2.JPG?updatedAt=1716003455129" 
            alt="Example" 
            width={500} 
            height={300} 
            className="w-full h-auto rounded-lg mb-4" 
            priority={true}
          />
          <p className="text-lg font-semibold">Image Description 2</p>
        </div>
        <div className="card p-4 border rounded-lg shadow-md">
          <Image 
            src="https://ik.imagekit.io/under2k/amazing3.JPG?updatedAt=1716003455129" 
            alt="Example" 
            width={500} 
            height={300} 
            className="w-full h-auto rounded-lg mb-4" 
            priority={true}
          />
          <p className="text-lg font-semibold">Image Description 3</p>
        </div>
        <div className="card p-4 border rounded-lg shadow-md">
          <Image 
            src="https://ik.imagekit.io/under2k/amazing4.JPG?updatedAt=1716003455129" 
            alt="Example" 
            width={500} 
            height={300} 
            className="w-full h-auto rounded-lg mb-4" 
            priority={true}
          />
          <p className="text-lg font-semibold">Image Description 4</p>
        </div>
      </div>
    </div>
  );
};

export default CalculatorBar;
