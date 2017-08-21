import React from 'react';
import { PanelGroup, Panel } from 'react-bootstrap/lib';
import fire from '../../util/fire';
import Categories from './Categories';

class Products extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
      return(
        <div className="col-sm-12 major-content">
          <Categories/>
        </div>
      )
    }
};

export default Products;
