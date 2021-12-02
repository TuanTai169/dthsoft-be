import React from "react"

import { Link, useLocation } from "react-router-dom"

import "./sidebar.css"

import logo from "../../assets/images/logo.png"

import sidebar_items from "../../assets/JsonData/sidebar_routes.json"

const SidebarItem = (props) => {
  const active = props.active ? "active" : ""

  return (
    <div className="sidebar__item">
      <div className={`sidebar__item-inner ${active}`}>
        <i className={props.icon}></i>
        <span>{props.title}</span>
      </div>
    </div>
  )
}

const Sidebar = () => {
  const { pathname } = useLocation()

  const activeItem = sidebar_items.findIndex((item) => item.route === pathname)

  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <img src={logo} alt="company logo" />
      </div>
      <div className="sidebar__body">
        {sidebar_items.map((item, index) => (
          <Link to={item.route} key={index}>
            <SidebarItem
              title={item.display_name}
              icon={item.icon}
              active={index === activeItem}
            />
          </Link>
        ))}
      </div>

      <div className="sidebar__footer">
        <p>Version 1.0</p>
        <p>Copyright © 2018 DTHSOFT</p>
      </div>
    </div>
  )
}

export default Sidebar
