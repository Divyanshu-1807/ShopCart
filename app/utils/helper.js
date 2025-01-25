import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';

export const getRating = rating => {
  const ratingStar = [];
  const fullStar = <FontAwesome name="star" size={16} color="#ffa41c" />;
  const halfStar = (
    <FontAwesome name="star-half-empty" size={16} color="#ffa41c" />
  );
  const emptyStar = <FontAwesome name="star-o" size={16} color="#ffa41c" />;

  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      ratingStar.push(fullStar);
    } else {
      ratingStar.push(emptyStar);
    }
  }
  if (rating % 1 !== 0) {
    ratingStar[Math.floor(rating)] = halfStar;
  }
  return ratingStar;
};

export const getProductFromApi = async (setProduct, category) => {
  const SPACE_ID = '695vp9jj8fcu';
  const ACCESS_TOKEN = 'DTubLqu8ziPq7r1kzIPkw3FMsoaqqmPNh-Utlk1wOPM';

  try {
    const response = await fetch(
      `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries`,
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );
    const data = await response.json();

    const itemsWithImages = await Promise.all(
      data.items
        .filter(item => item.fields.category === category) 
        .map(async item => {
          if (item.fields.image?.sys?.id) {
            const imageId = item.fields.image.sys.id;
            const imageResponse = await fetch(
              `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/assets/${imageId}`,
              {
                headers: {
                  Authorization: `Bearer ${ACCESS_TOKEN}`,
                },
              }
            );
            const imageData = await imageResponse.json();
            item.fields.imageUrl = `https:${imageData.fields.file.url}`;
          }
          return item;
        })
    );

    setProduct(itemsWithImages);
  } catch (error) {
    console.log(error);
  }
};

export const fetchProductDetails = async (setProduct,productId) => {
  const SPACE_ID = '695vp9jj8fcu';
  const ACCESS_TOKEN = 'DTubLqu8ziPq7r1kzIPkw3FMsoaqqmPNh-Utlk1wOPM';

  try {
    const response = await fetch(
      `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );
    const data = await response.json();

    if (data.fields.image?.sys?.id) {
      const imageId = data.fields.image.sys.id;
      const imageResponse = await fetch(
        `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/assets/${imageId}`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      const imageData = await imageResponse.json();
      data.fields.imageUrl = `https:${imageData.fields.file.url}`;
    }

    setProduct(data.fields);
  } catch (error) {
    console.log('Error fetching product details:', error);
  }
};

export const getAllProductsFromApi = async (setProducts) => {
  const SPACE_ID = '695vp9jj8fcu';
  const ACCESS_TOKEN = 'DTubLqu8ziPq7r1kzIPkw3FMsoaqqmPNh-Utlk1wOPM';

  try {
    const response = await fetch(
      `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries`,
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );
    const data = await response.json();

    const itemsWithImages = await Promise.all(
      data.items.map(async (item) => {
        if (item.fields.image?.sys?.id) {
          const imageId = item.fields.image.sys.id;
          const imageResponse = await fetch(
            `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/assets/${imageId}`,
            {
              headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`,
              },
            }
          );
          const imageData = await imageResponse.json();
          item.fields.imageUrl = `https:${imageData.fields.file.url}`;
        }
        return item;
      })
    );

    setProducts(itemsWithImages);
  } catch (error) {
    console.log('Error fetching all products:', error);
  }
};
