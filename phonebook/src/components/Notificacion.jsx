export const Notificacion = ({ notification, type }) => {
    if (notification === null) {
      return null
    }
  
    const classname = type === 'create' ? 'notification' : 'notificationE'
  
    return (
      <div className={classname}>
        {notification}
      </div>
    )
  }