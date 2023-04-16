import * as React from 'react';

export default function MethodModal() {
  const [showModal, setShowModal] = React.useState(false);

  // !Only for testing modal
  React.useEffect(() => {
    localStorage.removeItem('visited');
  }, []);

  React.useEffect(() => {
    const visited = localStorage.getItem('visited');
    if (!visited) {
      setShowModal(true);
    }
  }, []);
  function closeModal() {
    setShowModal(false);
    localStorage.setItem('visited', 'true');
  }
  return (
    <label
      htmlFor='my-modal-4'
      className={`modal ${showModal && 'modal-open'}`}
    >
      <label className='modal-box relative' htmlFor=''>
        <h3 className='text-lg font-bold'>Root Finding Methods</h3>
        <p className='py-4'>
          Play around with different root finding methods to find the roots of
          equations using the following methods:
        </p>
        <ul className='pb-4'>
          <li>Bisection Method</li>
          <li>Fixed-Point Iteration</li>
          <li>Newtons Method</li>
          <li>Secant Method</li>
          <li>Method of False Postion</li>
        </ul>
        <button className='btn' onClick={closeModal}>
          get started
        </button>
      </label>
    </label>
  );
}
