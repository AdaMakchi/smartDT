import axios from 'axios';
import { Platform } from 'react-native';

const api = axios.create({
  baseURL: 'https://smartdt.azurewebsites.net', // Using the local development server from the OpenAPI spec
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': `MyApp/${Platform.OS}`,
  },
});

// Helper function to handle errors
const handleError = (error: any, context: string) => {
  console.error(`Error in ${context}:`, error);
  throw error;
};

export const AccountsAPI = {
  getAll: async () => {
    try {
      const response = await api.get('/Accounts');
      return response.data;
    } catch (error) {
      return handleError(error, 'fetching accounts');
    }
  },
  getById: async (id: number) => {
    try {
      const response = await api.get(`/Accounts/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error, `fetching account ${id}`);
    }
  },
  create: async (accountData: any) => {
    try {
      const response = await api.post('/Accounts', accountData);
      return response.data;
    } catch (error) {
      return handleError(error, 'creating account');
    }
  },
  update: async (id: number, accountData: any) => {
    try {
      const response = await api.put(`/Accounts/${id}`, accountData);
      return response.data;
    } catch (error) {
      return handleError(error, `updating account ${id}`);
    }
  },
  delete: async (id: number) => {
    try {
      const response = await api.delete(`/Accounts/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error, `deleting account ${id}`);
    }
  },
  login: async (credentials: any) => {
    try {
      const response = await api.post('/accounts/Login', credentials);
      return response.data;
    } catch (error) {
      return handleError(error, 'login');
    }
  },
};

export const AddressesAPI = {
  create: async (addressData: any) => {
    try {
      const response = await api.post('/users/Adresses', addressData);
      return response.data;
    } catch (error) {
      return handleError(error, 'creating address');
    }
  },
  delete: async (id: number) => {
    try {
      const response = await api.delete(`/users/Adresses/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error, `deleting address ${id}`);
    }
  },
};

export const AmenitiesAPI = {
  getAll: async () => {
    try {
      const response = await api.get('/Amenities');
      return response.data;
    } catch (error) {
      return handleError(error, 'fetching amenities');
    }
  },
  getById: async (id: number) => {
    try {
      const response = await api.get(`/Amenities/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error, `fetching amenity ${id}`);
    }
  },
  create: async (amenityData: any) => {
    try {
      const response = await api.post('/Amenities', amenityData);
      return response.data;
    } catch (error) {
      return handleError(error, 'creating amenity');
    }
  },
  update: async (amenityData: any) => {
    try {
      const response = await api.put('/Amenities', amenityData);
      return response.data;
    } catch (error) {
      return handleError(error, 'updating amenity');
    }
  },
  delete: async (id: number) => {
    try {
      const response = await api.delete(`/Amenities/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error, `deleting amenity ${id}`);
    }
  },
};

export const AmenityRoomsAPI = {
  getAll: async () => {
    try {
      const response = await api.get('/AmenityRooms');
      return response.data;
    } catch (error) {
      return handleError(error, 'fetching amenity rooms');
    }
  },
  getRoomsByAmenityId: async (amenityId: number) => {
    try {
      const response = await api.get(`/AmenityRooms/${amenityId}`);
      return response.data;
    } catch (error) {
      return handleError(error, `fetching rooms for amenity ${amenityId}`);
    }
  },
  create: async (amenityRoomData: any) => {
    try {
      const response = await api.post('/AmenityRooms', amenityRoomData);
      return response.data;
    } catch (error) {
      return handleError(error, 'creating amenity room');
    }
  },
  delete: async (id: number) => {
    try {
      const response = await api.delete(`/AmenityRooms/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error, `deleting amenity room ${id}`);
    }
  },
};

export const AmenityStepsAPI = {
  create: async (amenityId: number, stepId: number) => {
    try {
      const response = await api.post('/AmenityStep', null, {
        params: { amenityId, stepId },
      });
      return response.data;
    } catch (error) {
      return handleError(error, 'creating amenity step');
    }
  },
  delete: async (stepId: number) => {
    try {
      const response = await api.delete('/AmenityStep', {
        params: { stepId },
      });
      return response.data;
    } catch (error) {
      return handleError(error, `deleting amenity step ${stepId}`);
    }
  },
};

export const ChatAPI = {
  getConversation: async (accountId: number) => {
    try {
      const response = await api.get(`/chat/${accountId}`);
      return response.data;
    } catch (error) {
      return handleError(error, `fetching conversation for account ${accountId}`);
    }
  },
  sendMessage: async (messageData: any, conversationId?: number) => {
    try {
      const response = await api.post('/chat', messageData, {
        params: { conversationId },
      });
      return response.data;
    } catch (error) {
      return handleError(error, 'sending message');
    }
  },
  chatWithAmazonLex: async (queryData: any) => {
    try {
      const response = await api.post('/ChatbotAmazonLex', queryData);
      return response.data;
    } catch (error) {
      return handleError(error, 'chatting with Amazon Lex');
    }
  },
};

export const CitiesAPI = {
  getAll: async () => {
    try {
      const response = await api.get('/Cities');
      return response.data;
    } catch (error) {
      return handleError(error, 'fetching cities');
    }
  },
  getById: async (id: number) => {
    try {
      const response = await api.get(`/Cities/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error, `fetching city ${id}`);
    }
  },
  create: async (cityData: any) => {
    try {
      const response = await api.post('/Cities', cityData);
      return response.data;
    } catch (error) {
      return handleError(error, 'creating city');
    }
  },
  update: async (id: string, cityData: any) => {
    try {
      const response = await api.put(`/Cities/${id}`, cityData);
      return response.data;
    } catch (error) {
      return handleError(error, `updating city ${id}`);
    }
  },
  delete: async (id: number) => {
    try {
      const response = await api.delete(`/Cities/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error, `deleting city ${id}`);
    }
  },
};

export const CountriesAPI = {
  getAll: async () => {
    try {
      const response = await api.get('/Countries');
      return response.data;
    } catch (error) {
      return handleError(error, 'fetching countries');
    }
  },
  getById: async (id: number) => {
    try {
      const response = await api.get(`/Countries/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error, `fetching country ${id}`);
    }
  },
  create: async (countryData: any) => {
    try {
      const response = await api.post('/Countries', countryData);
      return response.data;
    } catch (error) {
      return handleError(error, 'creating country');
    }
  },
  update: async (id: string, countryData: any) => {
    try {
      const response = await api.put(`/Countries/${id}`, countryData);
      return response.data;
    } catch (error) {
      return handleError(error, `updating country ${id}`);
    }
  },
  delete: async (id: number) => {
    try {
      const response = await api.delete(`/Countries/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error, `deleting country ${id}`);
    }
  },
};

export const CulturalAttractionsAPI = {
  getAll: async () => {
    try {
      const response = await api.get('/attraction/Culturals');
      return response.data;
    } catch (error) {
      return handleError(error, 'fetching cultural attractions');
    }
  },
  getById: async (id: number) => {
    try {
      const response = await api.get(`/attraction/Culturals/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error, `fetching cultural attraction ${id}`);
    }
  },
  create: async (culturalData: any) => {
    try {
      const response = await api.post('/attraction/Culturals', culturalData);
      return response.data;
    } catch (error) {
      return handleError(error, 'creating cultural attraction');
    }
  },
  update: async (culturalData: any) => {
    try {
      const response = await api.put('/attraction/Culturals', culturalData);
      return response.data;
    } catch (error) {
      return handleError(error, 'updating cultural attraction');
    }
  },
  delete: async (id: number) => {
    try {
      const response = await api.delete(`/attraction/Culturals/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error, `deleting cultural attraction ${id}`);
    }
  },
};

export const FavoriteHotelsAPI = {
  addFavorite: async (hotelId: number, accountId: number) => {
    try {
      const response = await api.post('/FavoriteHotel', null, {
        params: { hotelId, accountId },
      });
      return response.data;
    } catch (error) {
      return handleError(error, 'adding favorite hotel');
    }
  },
  removeFavorite: async (hotelId: number, accountId: number) => {
    try {
      const response = await api.delete('/FavoriteHotel', {
        params: { hotelId, accountId },
      });
      return response.data;
    } catch (error) {
      return handleError(error, 'removing favorite hotel');
    }
  },
};

export const HotelRatingsAPI = {
  getRating: async (id: number) => {
    try {
      const response = await api.get(`/locations/HotelRatings/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error, `fetching hotel rating ${id}`);
    }
  },
  create: async (ratingData: any) => {
    try {
      const response = await api.post('/locations/HotelRatings', ratingData);
      return response.data;
    } catch (error) {
      return handleError(error, 'creating hotel rating');
    }
  },
  update: async (ratingData: any) => {
    try {
      const response = await api.put('/locations/HotelRatings', ratingData);
      return response.data;
    } catch (error) {
      return handleError(error, 'updating hotel rating');
    }
  },
  delete: async (id: number) => {
    try {
      const response = await api.delete(`/locations/HotelRatings/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error, `deleting hotel rating ${id}`);
    }
  },
};

export const HotelRecommendationsAPI = {
  getRecommendations: async (hotelIds: number[]) => {
    try {
      const response = await api.post('/HotelRecommendation', hotelIds);
      return response.data;
    } catch (error) {
      return handleError(error, 'getting hotel recommendations');
    }
  },
  getEvaluatorValues: async () => {
    try {
      const response = await api.get('/HotelRecommendation/GetEvaluatorRecommenderValue');
      return response.data;
    } catch (error) {
      return handleError(error, 'getting evaluator values');
    }
  },
};

export const HotelsAPI = {
  getAll: async () => {
    try {
      const response = await api.get('/amenity/Hotels');
      return response.data;
    } catch (error) {
      return handleError(error, 'fetching hotels');
    }
  },
  getById: async (id: number) => {
    try {
      const response = await api.get(`/amenity/Hotels/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error, `fetching hotel ${id}`);
    }
  },
  create: async (hotelData: any) => {
    try {
      const response = await api.post('/amenity/Hotels', hotelData);
      return response.data;
    } catch (error) {
      return handleError(error, 'creating hotel');
    }
  },
  update: async (hotelData: any) => {
    try {
      const response = await api.put('/amenity/Hotels', hotelData);
      return response.data;
    } catch (error) {
      return handleError(error, 'updating hotel');
    }
  },
  delete: async (id: number) => {
    try {
      const response = await api.delete(`/amenity/Hotels/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error, `deleting hotel ${id}`);
    }
  },
};

export const ImagesAPI = {
  create: async (imageData: any) => {
    try {
      const response = await api.post('/locations/Images', imageData);
      return response.data;
    } catch (error) {
      return handleError(error, 'creating image');
    }
  },
  delete: async (id: number) => {
    try {
      const response = await api.delete(`/locations/Images/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error, `deleting image ${id}`);
    }
  },
};




export const ItinerariesAPI = {
  getAll: async () => {
    try {
      const response = await api.get('/Itineraries');
      return response.data;
    } catch (error) {
      return handleError(error, 'fetching itineraries');
    }
  },
  getById: async (id: number) => {
    try {
      const response = await api.get(`/Itineraries/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error, `fetching itinerary ${id}`);
    }
  },
  create: async (itineraryData: any) => {
    try {
      const response = await api.post('/Itineraries', itineraryData);
      return response.data;
    } catch (error) {
      return handleError(error, 'creating itinerary');
    }
  },
  update: async (id: number, itineraryData: any) => {
    try {
      const response = await api.put(`/Itineraries/${id}`, itineraryData);
      return response.data;
    } catch (error) {
      return handleError(error, `updating itinerary ${id}`);
    }
  },
  delete: async (id: number) => {
    try {
      const response = await api.delete(`/Itineraries/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error, `deleting itinerary ${id}`);
    }
  },
};

export const ItineraryStepsAPI = {
  getAll: async () => {
    try {
      const response = await api.get('/ItinerarySteps');
      return response.data;
    } catch (error) {
      return handleError(error, 'fetching itinerary steps');
    }
  },
  getById: async (id: number) => {
    try {
      const response = await api.get(`/ItinerarySteps/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error, `fetching itinerary step ${id}`);
    }
  },
  create: async (stepData: any) => {
    try {
      const response = await api.post('/ItinerarySteps', stepData);
      return response.data;
    } catch (error) {
      return handleError(error, 'creating itinerary step');
    }
  },
  update: async (id: number, stepData: any) => {
    try {
      const response = await api.put(`/ItinerarySteps/${id}`, stepData);
      return response.data;
    } catch (error) {
      return handleError(error, `updating itinerary step ${id}`);
    }
  },
  delete: async (id: number) => {
    try {
      const response = await api.delete(`/ItinerarySteps/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error, `deleting itinerary step ${id}`);
    }
  },
};

export const LocationsAPI = {
  getAll: async () => {
    try {
      const response = await api.get('/Locations');
      return response.data;
    } catch (error) {
      return handleError(error, 'fetching locations');
    }
  },
  getById: async (id: number) => {
    try {
      const response = await api.get(`/Locations/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error, `fetching location ${id}`);
    }
  },
  getByName: async (name: string) => {
    try {
      const response = await api.get(`/Locations/name=${name}`);
      return response.data;
    } catch (error) {
      return handleError(error, `fetching location by name ${name}`);
    }
  },
  create: async (locationData: any) => {
    try {
      const response = await api.post('/Locations', locationData);
      return response.data;
    } catch (error) {
      return handleError(error, 'creating location');
    }
  },
  update: async (locationData: any) => {
    try {
      const response = await api.put('/Locations', locationData);
      return response.data;
    } catch (error) {
      return handleError(error, 'updating location');
    }
  },
  delete: async (id: number) => {
    try {
      const response = await api.delete(`/Locations/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error, `deleting location ${id}`);
    }
  },
};

export const PersonalTransportationsAPI = {
  getAll: async () => {
    try {
      const response = await api.get('/PersonalTransportations');
      return response.data;
    } catch (error) {
      return handleError(error, 'fetching personal transportations');
    }
  },
  getById: async (id: number) => {
    try {
      const response = await api.get(`/PersonalTransportations/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error, `fetching personal transportation ${id}`);
    }
  },
  create: async (transportationData: any) => {
    try {
      const response = await api.post('/PersonalTransportations', transportationData);
      return response.data;
    } catch (error) {
      return handleError(error, 'creating personal transportation');
    }
  },
  update: async (transportationData: any) => {
    try {
      const response = await api.put('/PersonalTransportations', transportationData);
      return response.data;
    } catch (error) {
      return handleError(error, 'updating personal transportation');
    }
  },
  delete: async (id: number) => {
    try {
      const response = await api.delete(`/PersonalTransportations/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error, `deleting personal transportation ${id}`);
    }
  },
};

export const PersonalTransportStepsAPI = {
  create: async (personalTransportId: number, stepId: number) => {
    try {
      const response = await api.post('/PersonalTransportStep', null, {
        params: { personalTransportId, stepId },
      });
      return response.data;
    } catch (error) {
      return handleError(error, 'creating personal transport step');
    }
  },
  delete: async (stepId: number) => {
    try {
      const response = await api.delete('/PersonalTransportStep', {
        params: { stepId },
      });
      return response.data;
    } catch (error) {
      return handleError(error, `deleting personal transport step ${stepId}`);
    }
  },
};

export const PhysicalAttractionsAPI = {
  getAll: async () => {
    try {
      const response = await api.get('/attraction/Physicals');
      return response.data;
    } catch (error) {
      return handleError(error, 'fetching physical attractions');
    }
  },
  getById: async (id: number) => {
    try {
      const response = await api.get(`/attraction/Physicals/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error, `fetching physical attraction ${id}`);
    }
  },
  create: async (physicalData: any) => {
    try {
      const response = await api.post('/attraction/Physicals', physicalData);
      return response.data;
    } catch (error) {
      return handleError(error, 'creating physical attraction');
    }
  },
  update: async (physicalData: any) => {
    try {
      const response = await api.put('/attraction/Physicals', physicalData);
      return response.data;
    } catch (error) {
      return handleError(error, 'updating physical attraction');
    }
  },
  delete: async (id: number) => {
    try {
      const response = await api.delete(`/attraction/Physicals/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error, `deleting physical attraction ${id}`);
    }
  },
};

export const PublicTransportationsAPI = {
  getAll: async () => {
    try {
      const response = await api.get('/PublicTransportations');
      return response.data;
    } catch (error) {
      return handleError(error, 'fetching public transportations');
    }
  },
  getById: async (id: number) => {
    try {
      const response = await api.get(`/PublicTransportations/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error, `fetching public transportation ${id}`);
    }
  },
  create: async (transportationData: any) => {
    try {
      const response = await api.post('/PublicTransportations', transportationData);
      return response.data;
    } catch (error) {
      return handleError(error, 'creating public transportation');
    }
  },
  update: async (transportationData: any) => {
    try {
      const response = await api.put('/PublicTransportations', transportationData);
      return response.data;
    } catch (error) {
      return handleError(error, 'updating public transportation');
    }
  },
  delete: async (id: number) => {
    try {
      const response = await api.delete(`/PublicTransportations/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error, `deleting public transportation ${id}`);
    }
  },
};

export const PublicTransportStepsAPI = {
  create: async (publicTransportId: number, stepId: number) => {
    try {
      const response = await api.post('/PublicTransportStep', null, {
        params: { publicTransportId, stepId },
      });
      return response.data;
    } catch (error) {
      return handleError(error, 'creating public transport step');
    }
  },
  delete: async (stepId: number) => {
    try {
      const response = await api.delete('/PublicTransportStep', {
        params: { stepId },
      });
      return response.data;
    } catch (error) {
      return handleError(error, `deleting public transport step ${stepId}`);
    }
  },
};

export const RatingsAPI = {
  getRating: async (id: number) => {
    try {
      const response = await api.get(`/locations/Ratings/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error, `fetching rating ${id}`);
    }
  },
  create: async (ratingData: any) => {
    try {
      const response = await api.post('/locations/Ratings', ratingData);
      return response.data;
    } catch (error) {
      return handleError(error, 'creating rating');
    }
  },
  update: async (ratingData: any) => {
    try {
      const response = await api.put('/locations/Ratings', ratingData);
      return response.data;
    } catch (error) {
      return handleError(error, 'updating rating');
    }
  },
  delete: async (id: number) => {
    try {
      const response = await api.delete(`/locations/Ratings/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error, `deleting rating ${id}`);
    }
  },
};

export const RoomsAPI = {
  getAll: async () => {
    try {
      const response = await api.get('/Rooms');
      return response.data;
    } catch (error) {
      return handleError(error, 'fetching rooms');
    }
  },
  getById: async (id: number) => {
    try {
      const response = await api.get(`/Rooms/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error, `fetching room ${id}`);
    }
  },
  create: async (roomData: any) => {
    try {
      const response = await api.post('/Rooms', roomData);
      return response.data;
    } catch (error) {
      return handleError(error, 'creating room');
    }
  },
  update: async (roomData: any) => {
    try {
      const response = await api.put('/Rooms', roomData);
      return response.data;
    } catch (error) {
      return handleError(error, 'updating room');
    }
  },
  delete: async (id: number) => {
    try {
      const response = await api.delete(`/Rooms/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error, `deleting room ${id}`);
    }
  },
};

export const StepCulturalAttractionsAPI = {
  getAll: async () => {
    try {
      const response = await api.get('/StepCulturals');
      return response.data;
    } catch (error) {
      return handleError(error, 'fetching step cultural attractions');
    }
  },
  getByStepId: async (stepId: number) => {
    try {
      const response = await api.get(`/StepCulturals/${stepId}`);
      return response.data;
    } catch (error) {
      return handleError(error, `fetching step cultural attractions for step ${stepId}`);
    }
  },
  create: async (stepCulturalData: any) => {
    try {
      const response = await api.post('/StepCulturals', stepCulturalData);
      return response.data;
    } catch (error) {
      return handleError(error, 'creating step cultural attraction');
    }
  },
  delete: async (stepCulturalData: any) => {
    try {
      const response = await api.delete('/StepCulturals', { data: stepCulturalData });
      return response.data;
    } catch (error) {
      return handleError(error, 'deleting step cultural attraction');
    }
  },
};

export const StepPhysicalAttractionsAPI = {
  getAll: async () => {
    try {
      const response = await api.get('/StepPhysicals');
      return response.data;
    } catch (error) {
      return handleError(error, 'fetching step physical attractions');
    }
  },
  getByStepId: async (stepId: number) => {
    try {
      const response = await api.get(`/StepPhysicals/${stepId}`);
      return response.data;
    } catch (error) {
      return handleError(error, `fetching step physical attractions for step ${stepId}`);
    }
  },
  create: async (stepPhysicalData: any) => {
    try {
      const response = await api.post('/StepPhysicals', stepPhysicalData);
      return response.data;
    } catch (error) {
      return handleError(error, 'creating step physical attraction');
    }
  },
  delete: async (stepPhysicalData: any) => {
    try {
      const response = await api.delete('/StepPhysicals', { data: stepPhysicalData });
      return response.data;
    } catch (error) {
      return handleError(error, 'deleting step physical attraction');
    }
  },
};

export const StepTransportationsAPI = {
  getAll: async () => {
    try {
      const response = await api.get('/StepTransportations');
      return response.data;
    } catch (error) {
      return handleError(error, 'fetching step transportations');
    }
  },
  getByStepId: async (stepId: number) => {
    try {
      const response = await api.get(`/StepTransportations/${stepId}`);
      return response.data;
    } catch (error) {
      return handleError(error, `fetching step transportations for step ${stepId}`);
    }
  },
  create: async (stepTransportationData: any) => {
    try {
      const response = await api.post('/StepTransportations', stepTransportationData);
      return response.data;
    } catch (error) {
      return handleError(error, 'creating step transportation');
    }
  },
  delete: async (id: number) => {
    try {
      const response = await api.delete(`/StepTransportations/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error, `deleting step transportation ${id}`);
    }
  },
};

export const TransportationsAPI = {
  getAll: async () => {
    try {
      const response = await api.get('/Transportations');
      return response.data;
    } catch (error) {
      return handleError(error, 'fetching transportations');
    }
  },
  getById: async (id: number) => {
    try {
      const response = await api.get(`/Transportations/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error, `fetching transportation ${id}`);
    }
  },
  create: async (transportationData: any) => {
    try {
      const response = await api.post('/Transportations', transportationData);
      return response.data;
    } catch (error) {
      return handleError(error, 'creating transportation');
    }
  },
  update: async (transportationData: any) => {
    try {
      const response = await api.put('/Transportations', transportationData);
      return response.data;
    } catch (error) {
      return handleError(error, 'updating transportation');
    }
  },
  delete: async (id: number) => {
    try {
      const response = await api.delete(`/Transportations/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error, `deleting transportation ${id}`);
    }
  },
};

export const UsersAPI = {
  getAll: async () => {
    try {
      const response = await api.get('/Users');
      return response.data;
    } catch (error) {
      return handleError(error, 'fetching users');
    }
  },
  getById: async (id: number) => {
    try {
      const response = await api.get(`/Users/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error, `fetching user ${id}`);
    }
  },
  create: async (userData: any) => {
    try {
      const response = await api.post('/Users', userData);
      return response.data;
    } catch (error) {
      return handleError(error, 'creating user');
    }
  },
  update: async (id: number, userData: any) => {
    try {
      const response = await api.put('/Users', userData, {
        params: { id },
      });
      return response.data;
    } catch (error) {
      return handleError(error, `updating user ${id}`);
    }
  },
  delete: async (id: number) => {
    try {
      const response = await api.delete(`/Users/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error, `deleting user ${id}`);
    }
  },
};

export const VisitsAPI = {
  getAll: async () => {
    try {
      const response = await api.get('/Visits');
      return response.data;
    } catch (error) {
      return handleError(error, 'fetching visits');
    }
  },
  getById: async (id: number) => {
    try {
      const response = await api.get(`/Visits/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error, `fetching visit ${id}`);
    }
  },
  create: async (visitData: any) => {
    try {
      const response = await api.post('/Visits', visitData);
      return response.data;
    } catch (error) {
      return handleError(error, 'creating visit');
    }
  },
  update: async (id: number, visitData: any) => {
    try {
      const response = await api.put(`/Visits/${id}`, visitData);
      return response.data;
    } catch (error) {
      return handleError(error, `updating visit ${id}`);
    }
  },
  delete: async (id: number) => {
    try {
      const response = await api.delete(`/Visits/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error, `deleting visit ${id}`);
    }
  },
};

// Export all APIs in a single object for easier import
export default {
  AccountsAPI,
  AddressesAPI,
  AmenitiesAPI,
  AmenityRoomsAPI,
  AmenityStepsAPI,
  ChatAPI,
  CitiesAPI,
  CountriesAPI,
  CulturalAttractionsAPI,
  FavoriteHotelsAPI,
  HotelRatingsAPI,
  HotelRecommendationsAPI,
  HotelsAPI,
  ImagesAPI,
  ItinerariesAPI,
  ItineraryStepsAPI,
  LocationsAPI,
  PersonalTransportationsAPI,
  PersonalTransportStepsAPI,
  PhysicalAttractionsAPI,
  PublicTransportationsAPI,
  PublicTransportStepsAPI,
  RatingsAPI,
  RoomsAPI,
  StepCulturalAttractionsAPI,
  StepPhysicalAttractionsAPI,
  StepTransportationsAPI,
  TransportationsAPI,
  UsersAPI,
  VisitsAPI,
};