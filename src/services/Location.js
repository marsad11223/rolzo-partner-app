import axios from 'axios';
// import {BASE_URL} from '@env';
// const BASE_URL = process.env.BASE_URL_LS_LOCATION
const BASE_URL = process.env.STAGING_BASE_URL_LS_LOCATION;
const Location = {
  saveCurrentLocation: async (token, lng, lat, BookingId) => {
    try {
      const data = {
        latitude: lat,
        longitude: lng,
        partnerToken: token,
        bookingId: BookingId,
      };

      const response = await axios.post(
        `${BASE_URL}/partner/partnerGeolocation`,
        data
      );
      // const response = await axios.post(
      //   `${BASE_URL}/partner/${token}/geolocation/${lng}/${lat}/${BookingId}`,
      // );
      // console.log("response", response)
      return response.data;
    } catch (error) {
      console.log('we have saveCurrentLocation error', error);
      alert(error);
    }
  },
};

export default Location;
