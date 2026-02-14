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
          <div className="p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-almost-black"
                  style={{
                    fontFamily: "'Fredoka One', 'Righteous', 'Arial Black', sans-serif",
                  }}>
                Email Didn't Open?
              </h2>
              <button
                onClick={onClose}
                className="text-light-gray hover:text-medium-gray transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="text-medium-gray mb-4 text-sm">
              No worries! Copy your application below and email it to:
            </p>

            <div className="bg-white rounded-lg p-4 mb-4 border border-light-gray/30">
              <p className="font-medium text-almost-black">flex@wantmymtv.xyz</p>
            </div>

            <div className="bg-white rounded-lg p-4 mb-4 border border-light-gray/30 max-h-60 overflow-y-auto">
              <pre className="text-sm text-almost-black whitespace-pre-wrap font-mono">
                {generateEmailContent()}
              </pre>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCopy}
                className="flex-1 py-3 bg-almost-black text-warm-white rounded-xl font-medium
                         hover:bg-almost-black/90 transition-colors"
              >
                {copied ? '✓ Copied!' : 'Copy to Clipboard'}
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-white text-almost-black rounded-xl font-medium
                         border border-light-gray/30 hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className="bg-warm-white rounded-2xl max-w-2xl w-full my-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-black text-almost-black"
                style={{
                  fontFamily: "'Fredoka One', 'Righteous', 'Arial Black', sans-serif",
                }}>
              Apply for your RUNWAY Card
            </h2>
            <button
              onClick={onClose}
              className="text-light-gray hover:text-medium-gray transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <p className="text-medium-gray mb-6 text-sm">
            Tell me about your fashion practice. I'll review your stream and if it's a fit, I'll add your RUNWAY Card to the platform.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-almost-black mb-2">
                Creator/Brand Name *
              </label>
              <input
                type="text"
                name="creatorName"
                required
                value={formData.creatorName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white border border-light-gray/30
                         focus:outline-none focus:ring-2 focus:ring-almost-black/20"
                placeholder="Your name or brand name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-almost-black mb-2">
                YouTube Channel or Stream URL *
              </label>
              <input
                type="url"
                name="youtubeUrl"
                required
                value={formData.youtubeUrl}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white border border-light-gray/30
                         focus:outline-none focus:ring-2 focus:ring-almost-black/20"
                placeholder="https://youtube.com/@yourhandle"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-almost-black mb-2">
                Category *
              </label>
              <input
                type="text"
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white border border-light-gray/30
                         focus:outline-none focus:ring-2 focus:ring-almost-black/20"
                placeholder="styling, design, sneakers, vintage, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-almost-black mb-2">
                Tags (comma separated) *
              </label>
              <input
                type="text"
                name="tags"
                required
                value={formData.tags}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white border border-light-gray/30
                         focus:outline-none focus:ring-2 focus:ring-almost-black/20"
                placeholder="streetwear, vintage, sustainable, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-almost-black mb-2">
                Bio (keep it short and interesting) *
              </label>
              <textarea
                name="bio"
                required
                rows={3}
                value={formData.bio}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white border border-light-gray/30
                         focus:outline-none focus:ring-2 focus:ring-almost-black/20 resize-none"
                placeholder="A brief description of your style and content..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-almost-black mb-2">
                Your Email *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white border border-light-gray/30
                         focus:outline-none focus:ring-2 focus:ring-almost-black/20"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-almost-black mb-2">
                Social Links (optional)
              </label>
              <input
                type="text"
                name="socials"
                value={formData.socials}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white border border-light-gray/30
                         focus:outline-none focus:ring-2 focus:ring-almost-black/20"
                placeholder="Instagram, TikTok, website, etc."
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-almost-black text-warm-white rounded-xl font-medium
                       hover:bg-almost-black/90 transition-colors"
            >
              Send Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
