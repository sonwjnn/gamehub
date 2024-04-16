import { NewPasswordContent } from './_components/new-password-content'

const NewPasswordPage = () => {
  return (
    <div className="form_custom">
      <h2 className="ttl_main fz-18">
        <span>
          <strong className="icon sz-24 icon-color-white flex-shrink">
            <i className="icon-user"></i>
          </strong>
          NEW PASSWORD
        </span>
      </h2>
      <NewPasswordContent />
    </div>
  )
}

export default NewPasswordPage
