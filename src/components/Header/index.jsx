import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DropDown from './DropDown';

export default function Header({
  logoUrl,
  colorVariant,
  cart,
  actionBtnText,
  actionBtnUrl,
}) {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileToggle, setMobileToggle] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <header
      className={`cs_site_header cs_style_1 cs_sticky_header ${
        colorVariant ? colorVariant : 'cs_primary_color'
      } ${isSticky ? 'cs_gescout_show' : ''}`}
    >
      <div className="cs_main_header">
        <div className="container">
          <div className="cs_main_header_in">
            <div className="cs_main_header_left">
              <Link className="cs_site_branding" to="/">
                <img src={logoUrl} alt="Logo" />
              </Link>
            </div>
            <div className="cs_main_header_center">
              <div className="cs_nav cs_medium cs_primary_font">
                <ul
                  className={`${
                    mobileToggle ? 'cs_nav_list cs_active' : 'cs_nav_list'
                  }`}
                >
                  <li className="menu-item-has-children cs_mega_menu">
                    <Link to="/">Home</Link>
                    <DropDown>
                      <ul className="cs_mega_wrapper">
                        <li className="menu-item-has-children">
                          <Link to="/">Dark Version</Link>
                          <DropDown>
                            <ul>
                              <li>
                                <Link to="/">Creative Agency</Link>
                              </li>
                              <li>
                                <Link to="/marketing-agency">
                                  Marketing Agency
                                </Link>
                              </li>
                              <li>
                                <Link to="/studio-agency">Studio Agency</Link>
                              </li>
                              <li>
                                <Link to="/digital-agency">Digital Agency</Link>
                              </li>
                              <li>
                                <Link to="/tech-startup">Tech Startup</Link>
                              </li>
                            </ul>
                          </DropDown>
                        </li>
                        <li className="menu-item-has-children">
                          <Link to="/">Light Version</Link>
                          <DropDown>
                            <ul>
                              <li>
                                <Link to="/light">Creative Agency</Link>
                              </li>
                              <li>
                                <Link to="/light/marketing-agency">
                                  Marketing Agency
                                </Link>
                              </li>
                              <li>
                                <Link to="/light/studio-agency">
                                  Studio Agency
                                </Link>
                              </li>
                              <li>
                                <Link to="/light/digital-agency">
                                  Digital Agency
                                </Link>
                              </li>
                              <li>
                                <Link to="/light/tech-startup">
                                  Tech Startup
                                </Link>
                              </li>
                            </ul>
                          </DropDown>
                        </li>
                      </ul>
                    </DropDown>
                  </li>
                  <li>
                    <Link to="about">About</Link>
                  </li>
                  <li className="menu-item-has-children">
                    <Link to="service">Service</Link>
                    <DropDown>
                      <ul>
                        <li>
                          <Link to="service">Service</Link>
                        </li>
                        <li>
                          <Link to="service/service-details">
                            Service Details
                          </Link>
                        </li>
                      </ul>
                    </DropDown>
                  </li>
                  <li className="menu-item-has-children">
                    <Link to="blog">Blog</Link>
                    <DropDown>
                      <ul>
                        <li>
                          <Link to="blog">Blog Standard</Link>
                        </li>
                        <li>
                          <Link to="blog-list">Blog List</Link>
                        </li>
                        <li>
                          <Link to="blog/blog-details">Blog Details</Link>
                        </li>
                      </ul>
                    </DropDown>
                  </li>
                  <li className="menu-item-has-children">
                    <Link to="shop">Shop</Link>
                    <DropDown>
                      <ul>
                        <li>
                          <Link to="shop">Our Shop</Link>
                        </li>
                        <li>
                          <Link to="shop/product-details">Shop Details</Link>
                        </li>
                        <li>
                          <Link to="shop/cart">Cart</Link>
                        </li>
                        <li>
                          <Link to="shop/checkout">Checkout</Link>
                        </li>
                        <li>
                          <Link to="shop/success">Success Order</Link>
                        </li>
                        <li>
                          <Link to="shop/wishlist">Wishlist</Link>
                        </li>
                      </ul>
                    </DropDown>
                  </li>
                  <li className="menu-item-has-children">
                    <Link to="/">Pages</Link>
                    <DropDown>
                      <ul>
                        <li>
                          <Link to="portfolio">Portfolio</Link>
                        </li>
                        <li>
                          <Link to="portfolio/portfolio-details">
                            Portfolio Details
                          </Link>
                        </li>
                        <li>
                          <Link to="case-study-details">
                            Case Study Details
                          </Link>
                        </li>
                        <li>
                          <Link to="team">Team</Link>
                        </li>
                        <li>
                          <Link to="team/team-details">Team Details</Link>
                        </li>
                      </ul>
                    </DropDown>
                  </li>
                  <li>
                    <Link to="contact">Contact</Link>
                  </li>
                </ul>
                <span
                  className={
                    mobileToggle
                      ? 'cs_menu_toggle cs_teggle_active'
                      : 'cs_menu_toggle'
                  }
                  onClick={() => setMobileToggle(!mobileToggle)}
                >
                  <span></span>
                </span>
              </div>
            </div>
            <div className="cs_main_header_right">
              {cart && (
                <a href="shop-cart" className="cs_header_cart">
                  <svg
                    width={22}
                    height={22}
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_307_180)">
                      <path
                        d="M19.25 5.5H16.5C16.5 4.04131 15.9205 2.64236 14.8891 1.61091C13.8576 0.579463 12.4587 0 11 0C9.54131 0 8.14236 0.579463 7.11091 1.61091C6.07946 2.64236 5.5 4.04131 5.5 5.5H2.75C2.02065 5.5 1.32118 5.78973 0.805456 6.30546C0.289731 6.82118 0 7.52065 0 8.25L0 17.4167C0.00145554 18.6318 0.484808 19.7967 1.34403 20.656C2.20326 21.5152 3.3682 21.9985 4.58333 22H17.4167C18.6318 21.9985 19.7967 21.5152 20.656 20.656C21.5152 19.7967 21.9985 18.6318 22 17.4167V8.25C22 7.52065 21.7103 6.82118 21.1945 6.30546C20.6788 5.78973 19.9793 5.5 19.25 5.5ZM11 1.83333C11.9725 1.83333 12.9051 2.21964 13.5927 2.90728C14.2804 3.59491 14.6667 4.52754 14.6667 5.5H7.33333C7.33333 4.52754 7.71964 3.59491 8.40728 2.90728C9.09491 2.21964 10.0275 1.83333 11 1.83333ZM20.1667 17.4167C20.1667 18.146 19.8769 18.8455 19.3612 19.3612C18.8455 19.8769 18.146 20.1667 17.4167 20.1667H4.58333C3.85399 20.1667 3.15451 19.8769 2.63879 19.3612C2.12306 18.8455 1.83333 18.146 1.83333 17.4167V8.25C1.83333 8.00688 1.92991 7.77373 2.10182 7.60182C2.27373 7.42991 2.50688 7.33333 2.75 7.33333H5.5V9.16667C5.5 9.40978 5.59658 9.64294 5.76849 9.81485C5.94039 9.98676 6.17355 10.0833 6.41667 10.0833C6.65978 10.0833 6.89294 9.98676 7.06485 9.81485C7.23676 9.64294 7.33333 9.40978 7.33333 9.16667V7.33333H14.6667V9.16667C14.6667 9.40978 14.7632 9.64294 14.9352 9.81485C15.1071 9.98676 15.3402 10.0833 15.5833 10.0833C15.8264 10.0833 16.0596 9.98676 16.2315 9.81485C16.4034 9.64294 16.5 9.40978 16.5 9.16667V7.33333H19.25C19.4931 7.33333 19.7263 7.42991 19.8982 7.60182C20.0701 7.77373 20.1667 8.00688 20.1667 8.25V17.4167Z"
                        fill="currentColor"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_307_180">
                        <rect width={22} height={22} fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span className="cs_header_cart_label">0</span>
                </a>
              )}
              <Link
                to={actionBtnUrl}
                className={`cs_btn cs_style_1  ${
                  colorVariant ? 'cs_btn_white' : ''
                }`}
              >
                {actionBtnText}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
