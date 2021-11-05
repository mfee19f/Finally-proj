import React from 'react'

function MainContent(props) {
  return (
    <>
      <main role="main" className="flex-shrink-0">
        <div className="">{props.children}</div>
      </main>
    </>
  )
}

export default MainContent
