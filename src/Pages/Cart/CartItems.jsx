import React, { Fragment, useState } from "react";
import Style from "./Cart.module.css";
import Button from "../../Components/Ui/Button";

const CartItems = ({
  product,
  updateProductInCart,
  setBeforeUnloadEvent,
  totalPriceProduct,
  removeSpecificCartItem,
}) => {
  const notFound = product.product === undefined;
  const [deleting, setDeleting] = useState(false);

  return (
    <Fragment>
      <div
        className={`w-50 ${deleting ? Style.fadeOut : ''}`}
        style={{ transition: 'opacity 0.4s' }}
      >
        <ul className="d-flex">
          <li>
            <img
              src={
                notFound ? `${product.imageCover}` : product.product.imageCover
              }
              alt={product.title}
              width={80}
              className={Style.imgAnim}
            />
          </li>
          <li className={`p-2 ${Style.hoverAnim}` }>
            <p>{notFound ? product.title : product.product.title}</p>
            <p>${product.price}</p>
          </li>
        </ul>
      </div>

      <div className={`${Style.updateCountItem} me-4`}>
        <ul className=" d-flex justify-content-between align-items-center h-100">
          <li className={`${Style.productUpdateBtnsCover}`}>
            <Button
              className={`${Style.incrementBtn} me-1 border-0 ${Style.btnAnim}`}
              onClick={() => {
                updateProductInCart(
                  notFound ? product : product.product,
                  product.count,
                  "increment"
                );
                setBeforeUnloadEvent("increment");
              }}
              onMouseDown={e => e.currentTarget.classList.add(Style.btnClick)}
              onMouseUp={e => e.currentTarget.classList.remove(Style.btnClick)}
              onMouseLeave={e => e.currentTarget.classList.remove(Style.btnClick)}
            >
              <i className={`plus fa-sharp-duotone fa-solid fa-plus`}></i>
            </Button>
            <span>{product.count}</span>
            <Button
              className={`${Style.decrementBtn} me-2 border-0 ${Style.btnAnim}`}
              onClick={() => {
                updateProductInCart(
                  notFound ? product : product.product,
                  product.count,
                  "decrement"
                );
                setBeforeUnloadEvent("decrement");
              }}
              onMouseDown={e => e.currentTarget.classList.add(Style.btnClick)}
              onMouseUp={e => e.currentTarget.classList.remove(Style.btnClick)}
              onMouseLeave={e => e.currentTarget.classList.remove(Style.btnClick)}
            >
              <i className={` minus fa-solid fa-minus`}></i>
            </Button>
          </li>
          <li className="ms-1">
            ${totalPriceProduct(product.price, product.count)}
          </li>
          <li>
            <svg
              className={`${Style.svgColor} mb-2 ${Style.svgAnim}`}
              onClick={() => {
                setDeleting(true);
                setTimeout(() => {
                  removeSpecificCartItem(
                    notFound ? product.id : product.product.id
                  );
                }, 400);
              }}
              onMouseDown={e => e.currentTarget.classList.add(Style.svgClick)}
              onMouseUp={e => e.currentTarget.classList.remove(Style.svgClick)}
              onMouseLeave={e => e.currentTarget.classList.remove(Style.svgClick)}
              viewBox="0 0 24 24"
              fillRule="currentColor"
              width="24"
              height="24"
            >
              <path
                fillRule="evenodd"
                d="M13.5,3 C14.327,3 15,3.673 15,4.5 L15,4.5 L15,5 L19,5 L19,6 L18,6 L18,17.5 C18,18.879 16.878,20 15.5,20 L15.5,20 L7.5,20 C6.122,20 5,18.879 5,17.5 L5,17.5 L5,6 L4,6 L4,5 L8,5 L8,4.5 C8,3.673 8.673,3 9.5,3 L9.5,3 Z M17,6 L6,6 L6,17.5 C6,18.327 6.673,19 7.5,19 L7.5,19 L15.5,19 C16.327,19 17,18.327 17,17.5 L17,17.5 L17,6 Z M10,9 L10,16 L9,16 L9,9 L10,9 Z M14,9 L14,16 L13,16 L13,9 L14,9 Z M13.5,4 L9.5,4 C9.224,4 9,4.225 9,4.5 L9,4.5 L9,5 L14,5 L14,4.5 C14,4.225 13.776,4 13.5,4 L13.5,4 Z"
              ></path>
            </svg>
          </li>
        </ul>
      </div>
      <hr className="w-100" />
    </Fragment>
  );
};

export default CartItems;
