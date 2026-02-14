import React, { useState } from 'react';

export default function ApplyButton() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-8 right-8 z-40 bg-almost-black text-warm-white px-6 py-3 rounded-full
                 shadow-museum hover:shadow-museum-hover transition-all hover:-translate-y-1
                 text-sm font-medium"
      >
        Apply for your RUNWAY Card
      </button>

      {showForm && (
        <ApplyFormModal onClose={() => setShowForm(false)} />
      )}
    </>
  );
}

function ApplyFormModal({ onClose }) {
  const [formData, setFormData] = useState({
    creatorName: '',
    youtubeUrl: '',
    category: '',
    tags: '',
    bio: '',
    email: '',
    socials: ''
  });
  const [showCopyable, setShowCopyable] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateEmailContent = () => {
    return `RUNWAY CARD APPLICATION

Creator Name: ${formData.creatorName}
YouTube/Stream URL: ${formData.youtubeUrl}
Category: ${formData.category}
Tags: ${formData.tags}
Bio: ${formData.bio}
Email: ${formData.email}
Socials: ${formData.socials}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const subject = encodeURIComponent(`RUNWAY - New Creator Application: ${formData.creatorName}`);
    const body = encodeURIComponent(generateEmailContent());

    const mailtoLink = `mailto:flex@wantmymtv.xyz?subject=${subject}&body=${body}`;
    
    const a = document.createElement('a');
    a.href = mailtoLink;
    a.click();
    
    setTimeout(() => {
      setShowCopyable(true);
    }, 1000);
  };

  const handleCopy = () => {
    const content = generateEmailContent();
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (showCopyable) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
        <div className="bg-warm-white rounded-2xl max-w-2xl w-full my-8 shadow-2xl max-h-[90vh] overflow-y-auto">
          <div className=
