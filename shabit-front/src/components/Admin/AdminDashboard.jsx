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
                <i className="fa fa-dashboard" />
                <span>Dashboard</span>
              </a>
            </li>
            <li className="sub-menu">
              <a href="javascript:void(0);">
                <i className="fa fa-cogs" />
                <span>UI Elements</span>
                <i className="arrow fa fa-angle-right pull-right" />
              </a>
              <ul>
                <li>
                  <a href="ui-alerts-notifications.html">
                    Alerts &amp; Notifications
                  </a>
                </li>
                <li>
                  <a href="ui-panels.html">Panels</a>
                </li>
                <li>
                  <a href="ui-buttons.html">Buttons</a>
                </li>
                <li>
                  <a href="ui-slider-progress.html">Sliders &amp; Progress</a>
                </li>
                <li>
                  <a href="ui-modals-popups.html">Modals &amp; Popups</a>
                </li>
                <li>
                  <a href="ui-icons.html">Icons</a>
                </li>
                <li>
                  <a href="ui-grid.html">Grid</a>
                </li>
                <li>
                  <a href="ui-tabs-accordions.html">Tabs &amp; Accordions</a>
                </li>
                <li>
                  <a href="ui-nestable-list.html">Nestable Lists</a>
                </li>
              </ul>
            </li>
            <li className="sub-menu">
              <a href="javascript:void(0);">
                <i className="fa fa-table" />
                <span>Tables</span>
                <i className="arrow fa fa-angle-right pull-right" />
              </a>
              <ul>
                <li>
                  <a href="tables-basic.html">Basic Tables</a>
                </li>
                <li>
                  <a href="tables-data.html">Data Tables</a>
                </li>
              </ul>
            </li>
            <li className="sub-menu">
              <a href="javascript:void(0);">
                <i className="fa fa fa-tasks" />
                <span>Forms</span>
                <i className="arrow fa fa-angle-right pull-right" />
              </a>
              <ul>
                <li>
                  <a href="forms-components.html">Components</a>
                </li>
                <li>
                  <a href="forms-validation.html">Validation</a>
                </li>
                <li>
                  <a href="forms-mask.html">Mask</a>
                </li>
                <li>
                  <a href="forms-wizard.html">Wizard</a>
                </li>
                <li>
                  <a href="forms-multiple-file.html">Multiple File Upload</a>
                </li>
                <li>
                  <a href="forms-wysiwyg.html">WYSIWYG Editor</a>
                </li>
              </ul>
            </li>
            <li className="sub-menu active">
              <a href="javascript:void(0);">
                <i className="fa fa-envelope" />
                <span>Mail</span>
                <i className="arrow fa fa-angle-right pull-right" />
              </a>
              <ul>
                <li className="active">
                  <a href="mail-inbox.html">Inbox</a>
                </li>
                <li>
                  <a href="mail-compose.html">Compose Mail</a>
                </li>
              </ul>
            </li>
            <li className="sub-menu">
              <a href="javascript:void(0);">
                <i className="fa fa-bar-chart-o" />
                <span>Charts</span>
                <i className="arrow fa fa-angle-right pull-right" />
              </a>
              <ul>
                <li>
                  <a href="charts-chartjs.html">Chartjs</a>
                </li>
                <li>
                  <a href="charts-morris.html">Morris</a>
                </li>
                <li>
                  <a href="charts-c3.html">C3 Charts</a>
                </li>
              </ul>
            </li>
            <li className="sub-menu">
              <a href="javascript:void(0);">
                <i className="fa fa-map-marker" />
                <span>Maps</span>
                <i className="arrow fa fa-angle-right pull-right" />
              </a>
              <ul>
                <li>
                  <a href="map-google.html">Google Map</a>
                </li>
                <li>
                  <a href="map-vector.html">Vector Map</a>
                </li>
              </ul>
            </li>
            <li className="sub-menu">
              <a href="typography.html">
                <i className="fa fa-text-height" />
                <span>Typography</span>
              </a>
            </li>
            <li className="sub-menu">
              <a href="javascript:void(0);">
                <i className="fa fa-file" />
                <span>Pages</span>
                <i className="arrow fa fa-angle-right pull-right" />
              </a>
              <ul>
                <li>
                  <a href="pages-blank.html">Blank Page</a>
                </li>
                <li>
                  <a href="pages-login.html">Login</a>
                </li>
                <li>
                  <a href="pages-sign-up.html">Sign Up</a>
                </li>
                <li>
                  <a href="pages-calendar.html">Calendar</a>
                </li>
                <li>
                  <a href="pages-timeline.html">Timeline</a>
                </li>
                <li>
                  <a href="pages-404.html">404</a>
                </li>
                <li>
                  <a href="pages-500.html">500</a>
                </li>
              </ul>
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
  body {
    color: #5d5f63;
    background: #293949;
    font-family: 'Open Sans', sans-serif;
    padding: 0;
    margin: 0;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }
  .sidebar-toggle {
    margin-left: -240px;
  }
  .sidebar {
    width: 240px;
    height: 100%;
    background: #293949;
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
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          &.active {
            & > a {
              color: #1abc9c;
            }
            ul {
              display: block;
            }
          }
          a {
            color: #aeb2b7;
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
              color: #1abc9c;
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
        li {
          background: #23313f;
          margin-bottom: 0;
          margin-left: 0;
          margin-right: 0;
          border-bottom: none;
          a {
            font-size: 12px;
            padding-top: 13px;
            padding-bottom: 13px;
            color: #aeb2b7;
          }
        }
      }
    }
  }
`;
