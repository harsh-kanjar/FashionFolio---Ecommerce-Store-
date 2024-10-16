import React from 'react';

const categories = [
  { name: 'Men',  },
  { name: 'Women',    },
  { name: 'Shirts',   },
  { name: 'Dresses',  },
  { name: 'Blazers',  },
  { name: 'Skirts',   },
];

const Categories = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4">Browse By Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <div key={index} className="shadow-lg cursor-pointer bg-white p-4 rounded-lg text-center transition duration-300 ease-in-out transform hover:bg-red-500 group">
              <div className="text-red-500 mb-4 transition duration-300 ease-in-out group-hover:text-white flex justify-center">
                {category.icon}
              </div>
              <h3 className="text-red-500 font-semibold transition duration-300 ease-in-out transform group-hover:text-white">{category.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;
