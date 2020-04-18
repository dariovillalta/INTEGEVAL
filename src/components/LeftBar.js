import React from 'react';

export default class LeftBar extends React.Component {
    render() {
        return (
            <div>
                <div className={"nav-left-sidebar sidebar-dark"}>
                    <div className={"menu-list"}>
                        <nav className={"navbar navbar-expand-lg navbar-light"}>
                            <a className={"d-xl-none d-lg-none"} href="#">Dashboard</a>
                            <button className={"navbar-toggler"} type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className={"navbar-toggler-icon"}></span>
                            </button>
                            <div className={"collapse navbar-collapse"} id="navbarNav">
                                {this.props.navbar}
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        );
    }
}
