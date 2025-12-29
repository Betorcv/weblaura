'use client'

import { useState, useEffect } from 'react'
import styles from './Gallery.module.css'

interface Photo {
  src: string
  alt: string
}

export default function Gallery() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  useEffect(() => {
    // Lista de fotos - Añade aquí los nombres de tus fotos
    // Las fotos deben estar en public/photos/
    const photoList = [
      'reservacita.jpeg',
      // Añade aquí más fotos cuando las subas:
      // 'foto2.jpg',
      // 'foto3.jpg',
    ]

    const loadedPhotos: Photo[] = photoList
      .filter(photo => photo.trim() !== '') // Filtrar entradas vacías
      .map((photo) => ({
        src: `/photos/${photo}`,
        alt: `Carlos y Laura - ${photo}`
      }))

    setPhotos(loadedPhotos)
  }, [])

  if (photos.length === 0) {
    return (
      <div className={styles.galleryPlaceholder}>
        <div className={styles.placeholderIcon}>📸</div>
        <h3>Nuestros Momentos</h3>
        <p>
          Para mostrar tus fotos, edita el archivo <code>components/Gallery.tsx</code>
        </p>
        <p className={styles.galleryNote}>
          Añade los nombres de tus fotos en el array <code>photoList</code>
        </p>
        <p className={styles.galleryExample}>
          Ejemplo: <code>['foto1.jpg', 'foto2.jpg', 'foto3.jpg']</code>
        </p>
      </div>
    )
  }

  return (
    <>
      <div className={styles.gallery}>
        {photos.map((photo, index) => (
          <div
            key={index}
            className={styles.galleryItem}
            onClick={() => setSelectedPhoto(photo)}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
            />
            <div className={styles.galleryOverlay}>
              <span className={styles.viewIcon}>👁️</span>
            </div>
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <div
          className={styles.lightbox}
          onClick={() => setSelectedPhoto(null)}
        >
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.lightboxClose}
              onClick={() => setSelectedPhoto(null)}
              aria-label="Cerrar"
            >
              ×
            </button>
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.alt}
            />
          </div>
        </div>
      )}
    </>
  )
}
