// Write your JS code here
import {Component} from 'react'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    isSubmitSuccess: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = () => {
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailed = errorMsg => {
    this.setState({isSubmitSuccess: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    console.log(response)

    if (response.ok === true) {
      this.onSubmitSuccess()
    } else {
      const data = await response.json()
      console.log(data)
      this.onSubmitFailed(data.error_msg)
    }
  }

  render() {
    const {isSubmitSuccess, errorMsg, username, password} = this.state
    return (
      <div className="login-form-container">
        <div className="login-image">
          <img
            height={250}
            width={400}
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png "
            alt="website login"
          />
        </div>
        <div className="form-container">
          <img
            height={35}
            width={150}
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            alt="website logo"
          />
          <form onSubmit={this.submitForm}>
            <div className="label-input-container">
              <label className="label" htmlFor="userName">
                USERNAME
              </label>
              <input
                onChange={this.onChangeUsername}
                className="input-element"
                id="userName"
                type="text"
                placeholder="Username"
                value={username}
              />
            </div>

            <div className="label-input-container">
              <label className="label" htmlFor="password">
                PASSWORD
              </label>
              <input
                onChange={this.onChangePassword}
                className="input-element"
                id="password"
                type="password"
                placeholder="Password"
                value={password}
              />
            </div>

            <button type="submit" className="button">
              Login
            </button>
            {isSubmitSuccess && <p className="error-msg">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
