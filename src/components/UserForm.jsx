import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAppDispatch } from '../redux/hooks';
import { addUser, editUser } from '../redux/slices/usersSlice';

const makeEmptyExp = (currentExps) => ({
  id: String(currentExps.length),
  company: '',
  from: new Date(),
  to: new Date(),
});

export default function UserForm({ editing, onFinish, onRequestCancel }) {
  const dispatch = useAppDispatch();

  const [form, setForm] = useState({
    id: editing?.id ?? String(Date.now()),
    firstName: editing?.firstName ?? '',
    lastName: editing?.lastName ?? '',
    email: editing?.email ?? '',
    contact: editing?.contact ?? '',
    dob: editing?.dob ?? new Date(),
    experiences: editing?.experiences ?? [makeEmptyExp([])],
  });

  useEffect(() => {
    if (editing) setForm(editing);
  }, [editing]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const dob = form.dob instanceof Date ? form.dob : new Date(form.dob);
  
    const formattedExperiences = form.experiences.map((exp) => {
      const fromDate = exp.from instanceof Date ? exp.from : new Date(exp.from);
      const toDate = exp.to instanceof Date ? exp.to : new Date(exp.to);
      return {
        ...exp,
        from: fromDate.toISOString(),
        to: toDate.toISOString(),
      };
    });
  
    const payload = {
      ...form,
      dob: dob.toISOString(),
      experiences: formattedExperiences,
    };
  
    if (editing) {
      dispatch(editUser(payload));
    } else {
      dispatch(addUser(payload));
    }
  
    setForm({
      id: String(Date.now()),
      firstName: '',
      lastName: '',
      email: '',
      contact: '',
      dob: new Date(),
      experiences: [makeEmptyExp([])],
    });
    onFinish();
  };
  
  const updateExp = (idx, field, value) => {
    const exps = [...form.experiences];
    exps[idx] = { ...exps[idx], [field]: value };
    setForm({ ...form, experiences: exps });
  };

  const addExperience = () =>
    setForm({
      ...form,
      experiences: [...form.experiences, makeEmptyExp(form.experiences)],
    });

  const removeExperience = (idx) =>
    setForm({
      ...form,
      experiences: form.experiences.filter((_, i) => i !== idx),
    });

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow space-y-4">
      {/* Personal Details */}
      <div className="flex gap-4">
        <input
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={e => setForm({ ...form, firstName: e.target.value })}
          className="flex-1 border p-2 rounded"
          required
        />
        <input
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={e => setForm({ ...form, lastName: e.target.value })}
          className="flex-1 border p-2 rounded"
          required
        />
      </div>

      <div className="flex gap-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          className="flex-1 border p-2 rounded"
          required
        />
        <input
          name="contact"
          placeholder="Contact Number"
          value={form.contact}
          onChange={e => setForm({ ...form, contact: e.target.value })}
          className="flex-1 border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Date of Birth:</label>
        <DatePicker
          selected={form.dob}
          onChange={date => setForm({ ...form, dob: date })}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Experiences */}
      <div>
        <h3 className="font-semibold mb-2">Work Experiences</h3>
        {form.experiences.map((exp, idx) => (
          <div key={exp.id} className="flex items-center gap-2 mb-4">
            <input
              placeholder="Company"
              value={exp.company}
              onChange={e => updateExp(idx, 'company', e.target.value)}
              className="flex-1 border p-2 rounded"
              required
            />
            <DatePicker
              selected={exp.from}
              onChange={d => updateExp(idx, 'from', d)}
              className="border p-2 rounded"
            />
            <DatePicker
              selected={exp.to}
              onChange={d => updateExp(idx, 'to', d)}
              className="border p-2 rounded"
            />
            {form.experiences.length > 1 && (
              <button
                type="button"
                onClick={() => removeExperience(idx)}
                className="px-2 py-1 bg-red-400 text-white rounded"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addExperience}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          + Add Experience
        </button>
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-green-600 text-white font-semibold rounded"
      >
        {editing ? 'Update User' : 'Create User'}
      </button>

      <button
        type="submit"
        className="w-full py-2 bg-red-600 text-white font-semibold rounded"
        onClick={onRequestCancel}
      >
        Cancel
      </button>
    </form>
  );
}
