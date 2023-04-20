interface functionInputProps {
  functionInput: string;
  handleFunctionInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FunctionInput({
  functionInput,
  handleFunctionInput,
}: functionInputProps) {
  return (
    <div className='form-control w-full max-w-xs'>
      <label className='label'>
        <span className='label-text'>Enter an equation</span>
      </label>
      <input
        type='text'
        value={functionInput}
        onChange={handleFunctionInput}
        className='w-fill input-bordered input max-w-xs'
      />
    </div>
  );
}
