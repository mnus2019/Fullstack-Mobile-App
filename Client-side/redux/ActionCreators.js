import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

export const fetchCoffees = () => (dispatch) => {
  return fetch(baseUrl +'coffees')
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => response.json())
    .then((coffees) => dispatch(addCoffees(coffees)))
    .catch((error) => dispatch(coffeesFailed(error.message)));
};

export const coffeesFailed = (errMess) => ({
  type: ActionTypes.COFFEES_FAILED,
  payload: errMess,
});

export const addCoffees = (coffees) => ({
  type: ActionTypes.ADD_COFFEES,
  payload: coffees,
});



export const fetchSuites = () => (dispatch) => {
 return fetch(baseUrl +'suites')
   //return fetch(baseUrl + "suites")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => response.json())
    .then((suites) => dispatch(addSuites(suites)))
    .catch((error) => dispatch(suitesFailed(error.message)));
};

export const suitesFailed = (errMess) => ({
  type: ActionTypes.SUITES_FAILED,
  payload: errMess,
});

export const addSuites = (suites) => ({
  type: ActionTypes.ADD_SUITES,
  payload: suites,
});


export const fetchLocations = () => (dispatch) => {
  return  fetch(baseUrl + 'locations')
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => response.json())
    .then((locations) => dispatch(addLocations(locations)))
    .catch((error) => dispatch(locationsFailed(error.message)));
};

export const locationsFailed = (errMess) => ({
  type: ActionTypes.LOCATIONS_FAILED,
  payload: errMess,
});

export const addLocations = (locations) => ({
  type: ActionTypes.ADD_LOCATIONS,
  payload: locations,
});


export const fetchCampsites = () => (dispatch) => {
  dispatch(campsitesLoading());

  return fetch(baseUrl + "campsites")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => response.json())
    .then((campsites) => dispatch(addCampsites(campsites)))
    .catch((error) => dispatch(campsitesFailed(error.message)));
};

export const campsitesLoading = () => ({
  type: ActionTypes.CAMPSITES_LOADING,
});

export const campsitesFailed = (errMess) => ({
  type: ActionTypes.CAMPSITES_FAILED,
  payload: errMess,
});

export const addCampsites = (campsites) => ({
  type: ActionTypes.ADD_CAMPSITES,
  payload: campsites,
});


export const fetchClothes = () => (dispatch) => {
  dispatch(clothesLoading());

  return   fetch('https://hplussport.com/api/products/order/price')
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => response.json())
    .then((clothes) => dispatch(addClothes(clothes)))
    .catch((error) => dispatch(clothesFailed(error.message)));
};

export const clothesLoading = () => ({
  type: ActionTypes.CLOTHES_LOADING,
});

export const clothesFailed = (errMess) => ({
  type: ActionTypes.CLOTHES_FAILED,
  payload: errMess,
});

export const addClothes = (clothes) => ({
  type: ActionTypes.ADD_CLOTHES,
  payload: clothes,
});

export const fetchComments = () => (dispatch) => {
  return fetch(baseUrl + "comments")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => response.json())
    .then((comments) => dispatch(addComments(comments)))
    .catch((error) => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errMess) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errMess,
});

export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments,
});

export const postComment = (locationId, rating,author, text) => (dispatch) => {
  const newComment = {
    campsiteId:locationId,
    rating:rating,
    author: author,
    text: text
  
  };
  newComment.date = new Date().toISOString();

  
  return fetch(baseUrl + "comments", {
    method: "POST",
    body: JSON.stringify(newComment),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((response) => dispatch(addComment(response)))
    .catch((error) => {
      console.log("post comment", error.message);
      alert("Your comment could not be posted\nError: " + error.message);
    });
  
};

export const addComment = (comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment,
});




export const addItemToCart = ( item) => (dispatch) => {

  dispatch(addCart(item))
};

export const addCart = (item) => ({
  type: ActionTypes.ADD_TO_CART,
  payload: item,
});


export const deleteItemFromCart = ( item) => (dispatch) => {

  dispatch(deleteCart(item))
};

export const deleteCart = (item) => ({
  type: ActionTypes.REMOVE_FROM_CART,
  payload: item,
});

export const postFavorite = (campsiteId) => (dispatch) => {
  setTimeout(() => {
    dispatch(addFavorite(campsiteId));
  }, 2000);
};

export const addFavorite = (campsiteId) => ({
  type: ActionTypes.ADD_FAVORITE,
  payload: campsiteId,
});

export const fetchPartners = () => (dispatch) => {
  dispatch(partnersLoading());

  return fetch(baseUrl + "partners")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => response.json())
    .then((partners) => dispatch(addPartners(partners)))
    .catch((error) => dispatch(partnersFailed(error.message)));
};

export const partnersLoading = () => ({
  type: ActionTypes.PARTNERS_LOADING,
});

export const partnersFailed = (errMess) => ({
  type: ActionTypes.PARTNERS_FAILED,
  payload: errMess,
});

export const addPartners = (partners) => ({
  type: ActionTypes.ADD_PARTNERS,
  payload: partners,
});