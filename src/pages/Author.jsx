import React, { useState, useEffect } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";

import axios from "axios";

const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState();
  const [following, setFollowing] = useState(false);
  const [copyStatus, setCopyStatus] = useState(false);

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
    );

    setAuthor(data);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            {author ? (
              <div className="row">
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={author.authorImage} alt="" />

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {author.authorName}
                            <span className="profile_username">
                              @{author.tag}
                            </span>
                            <span id="wallet" className="profile_wallet">
                              {author.address}
                            </span>
                            <button
                              id="btn_copy"
                              title="Copy Text"
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  `${author.address}`
                                );
                                setCopyStatus(true);
                                setTimeout(() => {
                                  setCopyStatus(false);
                                }, 1500);
                              }}
                            >
                              {copyStatus ? "Copied" : "Copy"}
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          {following ? author.followers + 1 : author.followers}{" "}
                          followers
                        </div>

                        <button
                          to="#"
                          className="btn-main"
                          onClick={() => setFollowing(!following)}
                        >
                          {following ? "Unfollow" : "Follow"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <AuthorItems author={author} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <Skeleton
                          height="150px"
                          width="150px"
                          borderRadius="50%"
                        />
                        <div className="profile_name">
                          <h4>
                            <Skeleton height="25px" width="130px" />
                            <span className="profile_username">
                              <Skeleton height="20px" width="70px" />
                            </span>
                            <span id="wallet" className="profile_wallet">
                              <Skeleton height="20px" width="150px" />
                            </span>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          <Skeleton height="20px" width="90px" />
                        </div>
                        <Skeleton height="25px" width="95px" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <AuthorItems author={author} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
