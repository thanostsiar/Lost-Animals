import React, { useEffect, useRef, useState } from 'react';

const ClinicsInMap: React.FC = () => {
    const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
    const mapRef = useRef<HTMLDivElement>(null);
    const map = useRef<google.maps.Map>();
    const placesService = useRef<google.maps.places.PlacesService>();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation({ lat: latitude, lng: longitude });
            },
            (error) => {
                console.error('Error getting user location:', error);
            }
        );
    }, []);

    useEffect(() => {
        if (userLocation && mapRef.current && !map.current) {
            map.current = new google.maps.Map(mapRef.current, {
                center: userLocation,
                zoom: 12,
            });

            placesService.current = new google.maps.places.PlacesService(map.current);
            searchNearbyAnimalClinics();
        }
    }, [userLocation]);

    const searchNearbyAnimalClinics = () => {
        if (!placesService.current || !userLocation) return;

        const request: google.maps.places.PlaceSearchRequest = {
            location: userLocation,
            radius: 3000, // Use a number instead of a string
            keyword: 'animal clinics',
        };

        placesService.current.nearbySearch(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                for (let i = 0; i < results.length; i++) {
                    createMarker(results[i]);
                }
            }
        });
    };

    const createMarker = (place: google.maps.places.PlaceResult) => {
        if (!map.current || !place.geometry?.location) return;

        // Create a marker for each place.
        const marker = new google.maps.Marker({
            map: map.current,
            position: place.geometry.location,
            title: place.name,
        });

        // Create an InfoWindow with details about the clinic.
        let infoWindowContent = `<div><strong>${place.name}</strong><br/>${place.vicinity}</div>`;
        if (place.rating) {
            infoWindowContent += `<p>Rating: ${place.rating}</p>`;
        }
        const infoWindow = new google.maps.InfoWindow({
            content: infoWindowContent,
        });

        // Add a click listener to the marker to open the InfoWindow.
        marker.addListener('click', () => {
            infoWindow.open({
                anchor: marker,
                map: map.current,
                shouldFocus: false,
            });
        });
    };

    return <div ref={mapRef} style={{ width: '100%', height: '500px' }} />;
};

export default ClinicsInMap; 