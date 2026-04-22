'use client';

import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../component/navbar/navbar';
import styles from './page.module.css';
import { createOrganization } from '@/lib/upblit-api';

export default function NewOrganizationPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info');

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0] ?? null);
  };

  const handleCreate = async () => {
    if (!name.trim()) {
      setMessage('Please enter an organization name.');
      setMessageType('error');
      return;
    }

    if (!file) {
      setMessage('Please upload a logo file.');
      setMessageType('error');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      await createOrganization({
        name: name.trim(),
        description: description.trim(),
        file,
      });

      setMessage('Organization created successfully! Redirecting to dashboard...');
      setMessageType('success');

      setTimeout(() => {
        router.push('/dashboard');
      }, 1600);
    } catch (error) {
      console.error(error);
      setMessage('Organization creation failed. Please verify your login and backend configuration.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Navbar />

      <main className={styles.main}>
        <section className={styles.panel}>
          <button onClick={() => router.back()} className={styles.backBtn}>
            ← Back
          </button>

          <div className={styles.header}>
            <span className={styles.eyebrow}>Organization setup</span>
            <h1>Create your organization</h1>
            <p>
              The dashboard needs an organization before it can load projects. Add the
              basic details here and upload a logo to match the backend contract.
            </p>
          </div>

          <div className={styles.form}>
            <label className={styles.field}>
              <span>Name</span>
              <input
                className={styles.input}
                placeholder="Upblit Labs"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </label>

            <label className={styles.field}>
              <span>Description</span>
              <textarea
                className={styles.textarea}
                placeholder="What does this organization build?"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                rows={4}
              />
            </label>

            <label className={styles.field}>
              <span>Logo file</span>
              <input
                type="file"
                accept="image/*"
                className={styles.fileInput}
                onChange={handleFileChange}
              />
              {file && <small className={styles.fileName}>{file.name}</small>}
            </label>

            <button
              onClick={handleCreate}
              className={styles.createBtn}
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create organization'}
            </button>

            {message && (
              <div className={`${styles.message} ${styles[messageType]}`}>
                {message}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
