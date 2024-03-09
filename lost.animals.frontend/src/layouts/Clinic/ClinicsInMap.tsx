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
            const mapOptions: google.maps.MapOptions = {
                center: userLocation,
                zoom: calculateZoomLevel(),
            };

            map.current = new google.maps.Map(mapRef.current, mapOptions);

            placesService.current = new google.maps.places.PlacesService(map.current);
            searchNearbyAnimalClinics();
        }
    }, [userLocation]);

    const calculateZoomLevel = () => {
        if (!mapRef.current || !userLocation) return 12;

        const containerWidth = mapRef.current.offsetWidth;
        const containerHeight = mapRef.current.offsetHeight;

        // Adjust zoom level based on container dimensions
        const zoomWidth = Math.log2(360 * containerWidth / 256 / 2 / 256);
        const zoomHeight = Math.log2(180 * containerHeight / 256 / 2 / 256);
        const zoomLevel = Math.min(zoomWidth, zoomHeight);
        const adjustedZoomLevel = zoomLevel + 1;
        return Math.max(adjustedZoomLevel, 12);
    };

    const searchNearbyAnimalClinics = () => {
        if (!placesService.current || !userLocation) return;

        const request: google.maps.places.PlaceSearchRequest = {
            location: userLocation,
            radius: 2000, 
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

        marker.addListener('click', () => {
            infoWindow.open({
                anchor: marker,
                map: map.current,
                shouldFocus: false,
            });
        });
    };

    return <div ref={mapRef} style={{ width: '100%', height: '80vh' }} />;
};

export default ClinicsInMap; 