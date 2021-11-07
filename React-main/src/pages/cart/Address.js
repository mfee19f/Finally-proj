import React from 'react'

import { ZipCodeTW } from 'zipcode-tw-react'

class Address extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      displayType: 'text',
      county: '台北市',
      district: '中山區',
      zipCode: '104',
      address: '敬業三路20號',
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  // 變更地址資訊
  handleZipCodeChange = (e) => {
    const {
      countyFieldName,
      countyValue,
      districtFieldName,
      districtValue,
      zipFieldName,
      zipValue,
    } = e
    this.setState({
      [zipFieldName]: zipValue,
      [countyFieldName]: countyValue,
      [districtFieldName]: districtValue,
    })
  }

  render() {

    return (
      <>
        <div className="form-group">
          
          <div className="form-inline">
            <ZipCodeTW
              displayType={this.state.displayType}
              countyValue={this.state.county}
              districtValue={this.state.district}
              zipCodeValue={this.state.zipCode}
              handleChangeCounty={this.handleZipCodeChange}
              handleChangeDistrict={
                this.handleZipCodeChange
              }
              handleChangeZipCode={this.handleZipCodeChange}
              handleBlurZipCode={this.handleZipCodeChange}
              handleZipCodeNotExists={
                this.handleZipCodeNotExists
              }
            />
            {/* <label style={{ marginLeft: '15px' }}>
              address
            </label>
            <input
              name="address"
              value={this.state.address}
              className="form-control"
              placeholder="輸入地址"
              style={{
                marginLeft: '5px',
                width: '300px',
                display: addressShow,
              }}
              onChange={this.handleChange}
            /> */}
          </div>
        </div>
      </>
    )
  }
}

export default Address
