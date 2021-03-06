export const FETCH_USER = "FETCH_USER";
export const UPDATE_USER = "UPDATE_USER";
export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";


export const fetchUser = user_id => ( {
  type: FETCH_USER,
  user_id
} );

export const updateUser = user => ( {
  type: UPDATE_USER,
  user
} );

export const receiveUser = user => ( {
  type: RECEIVE_USER,
  user
} );

export const receiveErrors = errors => ( {
  type: RECEIVE_ERRORS,
  errors
} );
