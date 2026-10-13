import React, { useState } from 'react';
import { Plus, X, Search, Check, Sparkles } from 'lucide-react';

const COMMON_SKILLS = [
  'Java', 'Spring Boot', 'React', 'JavaScript', 'TypeScript',
  'Python', 'MySQL', 'PostgreSQL', 'MongoDB', 'Docker',
  'REST APIs', 'Git', 'AWS', 'Microservices', 'HTML', 'CSS',
  'Node.js', 'Redux', 'Linux', 'Problem Solving', 'Data Analytics'
];

export const SkillTagSelector = ({ selectedSkills, onChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const isSelected = (name) => selectedSkills.some((s) => s.name.toLowerCase() === name.toLowerCase());

  const addSkill = (name, proficiency = 'INTERMEDIATE') => {
    if (!name.trim()) return;
    if (!isSelected(name)) {
      onChange([...selectedSkills, { name: name.trim(), proficiency }]);
    }
    setSearchTerm('');
  };

  const removeSkill = (name) => {
    onChange(selectedSkills.filter((s) => s.name.toLowerCase() !== name.toLowerCase()));
  };

  const updateProficiency = (name, proficiency) => {
    onChange(
      selectedSkills.map((s) => (s.name.toLowerCase() === name.toLowerCase() ? { ...s, proficiency } : s))
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (searchTerm.trim()) {
        addSkill(searchTerm.trim());
      }
    }
  };

  const filteredSuggestions = COMMON_SKILLS.filter(
    (s) => s.toLowerCase().includes(searchTerm.toLowerCase()) && !isSelected(s)
  );

  return (
    <div>
      {/* Search & Add Input */}
      <div style={{ position: 'relative', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search
              size={17}
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
            />
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: '2.4rem' }}
              placeholder="Search or type a skill (e.g. Java, React, Docker) and press Enter..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          {searchTerm.trim() && (
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => addSkill(searchTerm)}
            >
              <Plus size={16} /> Add
            </button>
          )}
        </div>
      </div>

      {/* Selected Skills with Proficiency Toggles */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
          Selected Skills ({selectedSkills.length})
        </div>
        {selectedSkills.length === 0 ? (
          <div style={{ padding: '1rem', border: '1px dashed var(--border-color)', borderRadius: 'var(--radius-md)', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            No skills added yet. Select from the quick suggestions below or type your skills above.
          </div>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
            {selectedSkills.map((skill, index) => (
              <div
                key={index}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.35rem 0.5rem 0.35rem 0.85rem',
                  gap: '0.5rem',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>{skill.name}</span>
                <select
                  value={skill.proficiency}
                  onChange={(e) => updateProficiency(skill.name, e.target.value)}
                  style={{
                    fontSize: '0.75rem',
                    padding: '0.2rem 0.4rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--primary-600)',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  <option value="BEGINNER">Beginner</option>
                  <option value="INTERMEDIATE">Intermediate</option>
                  <option value="ADVANCED">Advanced</option>
                  <option value="EXPERT">Expert</option>
                </select>
                <button
                  type="button"
                  onClick={() => removeSkill(skill.name)}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '0.15rem' }}
                  title="Remove skill"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Suggestions Chips */}
      <div>
        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Sparkles size={14} color="var(--primary-600)" /> Popular Technical Competencies
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
          {(searchTerm ? filteredSuggestions : COMMON_SKILLS.filter((s) => !isSelected(s))).slice(0, 14).map((skillName, idx) => (
            <button
              key={idx}
              type="button"
              className="skill-chip"
              style={{ cursor: 'pointer', borderStyle: 'dashed' }}
              onClick={() => addSkill(skillName)}
            >
              <Plus size={13} /> {skillName}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
