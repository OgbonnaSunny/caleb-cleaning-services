import React, {useState, useEffect} from 'react';

const Assign = () => {
  const [areaList, setAreaList] = useState([]);
  const [areaName, setAreaName] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
      e.preventDefault();
      setAreaList([]); // to be replaced with backend code
      setAreaName('');

  }

  const addArea = (e) => {
      e.preventDefault();
      if (areaName.length === 0) {
          setError('no area is assigned');
          return;
      }
      const list = []
      list.push(...areaList)
      list.push(areaName)
      setAreaList(list);
  }


    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
        }}>
            <div className={'container'} style={{marginTop: '50px'}}>
                <h3 style={{color:'navy', textAlign:'center', marginBottom:'10px'}}>Assign areas to a cleaner</h3>
                <form className='form' onSubmit={handleSubmit}>
                    <div className="price-container">
                        <div style={{display: 'block', justifyContent: 'space-between', alignItems: 'center'}}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    id="postcode"
                                    value={areaName}
                                    onChange={(e) => setAreaName(e.target.value)}
                                    required
                                    className={'button-bg'}
                                    style={{marginTop:'30px', marginBottom:'10px'}}
                                />
                                <label style={{color:'red'}}>{error}</label>
                            </div>

                        </div>
                        <button
                            type="button" className="btn btn-primary"
                            style={{color:'navy', marginTop:'20px', textAlign:'center', backgroundColor:'green'}}
                            onClick={addArea}>Add
                        </button>
                        <button
                            disabled={areaList.length === 0}
                            type={'submit'} className="btn btn-success"
                            style={areaList.length === 0 ? {color:'black', marginTop:'20px', textAlign:'center', backgroundColor:''} :{color:'navy', marginTop:'20px', textAlign:'center', backgroundColor:'green'} }>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Assign;