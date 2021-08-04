import React from "react";
import { Spinner } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../@styles/styles.components.css";

export default function Loading(){
  return (
    <div className="Loading1">
      <div className="Loading2">
        <Spinner className="Spinner" color="primary"/>
      </div>
    </div>
  );
}