import sanityClient from "@sanity/client"

export const client = sanityClient({
	projectId:'bsfswfet',
    dataset: 'production',
    apiVersion: '2021-03-25',
    useCdn:false,
    token:'sks7gwkWrphtmlqMEt9Z3RkVDGEXx0thne8aoHiHoF0sUbiE2VnEX4BV6ZVIrsBhVVjs3hX9FRJ7XCEwcWAOLEGlUXbrkwXqN8cXRznv33N6y32RR2fdPhR6FlzOs1p1NVVVkUelrrGW5TXM9l2bzP2QKl8TaLzQt9RTExh2ul7rU5MUfGlh'
})