import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Countdown from "../UI/Countdown";
import Skeleton from "../UI/Skeleton";
import OwlCarousel from "react-owl-carousel";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);

  const options = {
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
      0: { items: 1 },
      576: { items: 2 },
      768: { items: 3 },
      1200: { items: 4 },
    },
  };

  const fetchNewItems = async () => {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    setNewItems(data);
  };

  useEffect(() => {
    fetchNewItems();
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {!newItems.length ? (
            <OwlCarousel
              data-aos="fade-in"
              data-aos-duration="1000"
              {...options}
            >
              {new Array(8).fill(0).map((_, index) => (
                <div className="nft__item" key={index}>
                  <div className="author_list_pp">
                    <Link
                      to="/author"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Creator: Monica Lucas"
                    >
                      <Skeleton height="50px" width="50px" borderRadius="50%" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>

                  <div className="nft__item_wrap">
                    <div className="nft__item_extra">
                      <div className="nft__item_buttons">
                        <button>Buy Now</button>
                        <div className="nft__item_share">
                          <h4>Share</h4>
                          <a
                            href="https://www.facebook.com/sharer/sharer.php?u=https://gigaland.io"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i className="fa fa-facebook fa-lg"></i>
                          </a>
                          <a
                            href="https://twitter.com/intent/tweet?url=https://gigaland.io"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <i className="fa fa-twitter fa-lg"></i>
                          </a>
                          <a href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site https://gigaland.io">
                            <i className="fa fa-envelope fa-lg"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    <Link to="/item-details">
                      <Skeleton height="350px" width="100%" />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to="/item-details">
                      <Skeleton height="28px" width="180px" />
                    </Link>
                    <Skeleton height="20px" width="100px" />
                  </div>
                  <div className="nft__item_like">
                    <Skeleton height="15px" width="30px" />
                  </div>
                </div>
              ))}
            </OwlCarousel>
          ) : (
            <>
              <OwlCarousel
                data-aos="fade-in"
                data-aos-duration="1000"
                {...options}
              >
                {newItems.map((item) => (
                  <div className="nft__item" key={item.id}>
                    <div className="author_list_pp">
                      <Link
                        to={`/author/${item.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title={"Creator: Monica Lucas"}
                      >
                        <img className="lazy" src={item.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <Countdown expiryDate={item.expiryDate} />

                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <Link to={`item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to="/item-details">
                        <h4>Pinky Ocean</h4>
                      </Link>
                      <div className="nft__item_price">{item.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{item.likes}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
