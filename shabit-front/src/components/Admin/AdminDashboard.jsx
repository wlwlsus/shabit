import React from 'react';
import styled from 'styled-components';

const AdminDashboard = () => {
  return (
    <StyledContainer>
      <aside className="sidebar">
        <div id="leftside-navigation" className="nano">
          <ul className="nano-content">
            <li>
              <a href="index.html">
                <span></span>
              </a>
            </li>
            <li>
              <a href="index.html">
                <i className="fa fa-dashboard" />
                <span>Dashboard</span>
              </a>
            </li>
            <li className="sub-menu">
              <a href="javascript:void(0);">
                <span>UI Elements</span>
              </a>
            </li>
            <li className="sub-menu">
              <a href="javascript:void(0);">
                <i className="fa fa-table" />
                <span>Tables</span>
                <i className="arrow fa fa-angle-right pull-right" />
              </a>
            </li>
            <li className="sub-menu">
              <a href="javascript:void(0);">
                <span>Forms</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </StyledContainer>
  );
};

export default AdminDashboard;

const StyledContainer = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,700');
  @import url('//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css');

  .sidebar-toggle {
    margin-left: -240px;
  }
  .sidebar {
    width: 240px;
    height: 100%;
    background: ${(props) => props.theme.color.whiteColor};
    position: absolute;
    top: 0rem;
    left: 0rem;
    border-radius: 1.5rem 0 0 1.5rem;
    -webkit-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    -ms-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    z-index: 100;
    #leftside-navigation {
      ul,
      ul ul {
        margin: -2px 0 0;
        padding: 0;
      }
      ul {
        li {
          list-style-type: none;
          border-bottom: 1px solid rgba(247, 183, 183, 0.212);
          &.active {
            & > a {
              color: ${(props) => props.theme.color.grayColor};
            }
            ul {
              display: block;
            }
          }
          a {
            color: ${(props) => props.theme.color.grayColor};
            text-decoration: none;
            display: block;
            padding: 18px 0 18px 25px;
            font-size: 12px;
            outline: 0;
            -webkit-transition: all 200ms ease-in;
            -moz-transition: all 200ms ease-in;
            -o-transition: all 200ms ease-in;
            -ms-transition: all 200ms ease-in;
            transition: all 200ms ease-in;
            &:hover {
              color: ${(props) => props.theme.color.grayColor};
            }
            span {
              display: inline-block;
            }
            i {
              width: 20px;
              .fa-angle-left,
              .fa-angle-right {
                padding-top: 3px;
              }
            }
          }
        }
      }
      ul ul {
        display: none;
      }
    }
  }
`;
