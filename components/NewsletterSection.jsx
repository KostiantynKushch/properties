import { useMutation } from '@apollo/client';
import { useEffect } from 'react';
import {
  CREATE_NEWSLETTER_DRAFT,
  UPDATE_NEWSLETTER_VALUE,
  SUBMIT_NEWSLETTER_FORM,
} from '../lib/Queries';

const NewsletterSection = ({ title, description, formId }) => {
  const [createDraft, loading, error] = useMutation(CREATE_NEWSLETTER_DRAFT);
  const [
    updateDraft,
    { loading: updateLoading, error: updateError },
  ] = useMutation(UPDATE_NEWSLETTER_VALUE);

  const handleSubmit = (e) => {
    e.preventDefault();
    createDraft({ variables: { formId: formId } });
  };

  useEffect(() => {
    if (loading.loading === false && loading.data !== undefined) {
      console.log(loading.data.createGravityFormsDraftEntry.resumeToken);
    }
  }, [loading]);

  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      <p>{formId}</p>
      <form onSubmit={handleSubmit}>
        <input type="email" required />
        <button type="submit">Submit</button>
      </form>
      {loading.loading && <p>Loading ...</p>}
      {error && <p>Error</p>}
    </div>
  );
};

export default NewsletterSection;
