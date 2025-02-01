import React from 'react'

function Logo({
  children,
  textSize = "text-2xl",
  font = "logo",
  textColor = "text-white",
  ...props
}) {
  return (
    
        <div className={`${textSize} ${font} ${textColor}`} {...props}>
            {children}
          </div>
    
  )
}

export default Logo