import React, { useState } from 'react'

import { Link } from 'react-router-dom';


function InputField() {
  const [inputTxt, setInputTxt] = useState("");


  return (
  <div class="input-group">
  <div class="form-outline">
    <input onChange={(e) => setInputTxt(e.target.value)} type="search" id="form1" class="form-control" />
  </div>
  <Link to={`/search?q=${inputTxt}`} type="button" class="btn btn-warning">
    <i class="fas fa-search"></i>
  </Link>
</div>


  )
}

export default InputField