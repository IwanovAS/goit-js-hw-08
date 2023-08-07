import SimpleLightbox from "simplelightbox";
import { galleryItems } from './gallery-items';
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryList = document.querySelector('.gallery');

const galleryItemsMarkup = galleryItems
  .map(({ preview, original, description }) => `
    <li class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          alt="${description}"
        />
      </a>
    </li>
  `)
  .join('');

galleryList.insertAdjacentHTML('beforeend', galleryItemsMarkup);

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

console.log(galleryItems);
