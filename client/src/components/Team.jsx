import logo from '../img/team/02.jpg'
import logo2 from '../img/team/03.jpg'
export const Team = (props) => {
  return (
    <div id='team' className='text-center'>
      <div className='container'>
        <div className='col-md-8 col-md-offset-2 section-title'>
          <h2>Meet the Team</h2>
          <p>
            Say hi to the development team !!!! 
          </p>
        </div>
        <div id='row'>
                <div className='col-md-12 col-sm-6 team'>
                  <div className='thumbnail'>
                    {' '}
                    <img src={logo} alt='...' className='team-img' />
                    <div className='caption'>
                      <h4>Suraj Baradhi</h4>
                      <p>Computer Science Undergrad NIT Warangal</p>
                    </div>
                  </div>
                </div>
        </div>
      </div>
    </div>
  )
}
