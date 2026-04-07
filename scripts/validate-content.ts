/**
 * validate-content.ts
 * Run: npx tsx scripts/validate-content.ts
 *
 * Validates every quiz question and vocabulary list across all 30 subjects.
 * Reports: [SUBJECT_ID] [LEVEL] [ISSUE] [DETAILS]
 */

import { SUBJECTS } from '../src/data/subjects'

// ── helpers ───────────────────────────────────────────────────────────────────

type Issue = { subjectId: string; level: number; issue: string; details: string }
const issues: Issue[] = []

function report(subjectId: string, level: number, issue: string, details: string) {
  issues.push({ subjectId, level, issue, details })
}

// ── run validation ─────────────────────────────────────────────────────────────

for (const subject of SUBJECTS) {
  const seenIds = new Set<string>()   // across all levels of this subject

  for (const lvl of subject.levels) {
    const L = lvl.level

    // 1. Word count (must have ≥6)
    if (!lvl.words || lvl.words.length < 6) {
      report(subject.id, L, 'LOW_VOCAB',
        `Has ${lvl.words?.length ?? 0} vocabulary items (need ≥ 6)`)
    }

    // 2. Quiz count (must be exactly 5)
    if (!lvl.quiz || lvl.quiz.length === 0) {
      report(subject.id, L, 'NO_QUIZ', `Level has 0 quiz questions`)
    } else if (lvl.quiz.length !== 5) {
      report(subject.id, L, 'WRONG_QUIZ_COUNT',
        `Has ${lvl.quiz.length} quiz questions (need exactly 5)`)
    }

    for (const q of (lvl.quiz ?? [])) {
      // 3. Duplicate IDs (within subject)
      if (seenIds.has(q.id)) {
        report(subject.id, L, 'DUPLICATE_ID', `ID "${q.id}" used more than once`)
      } else {
        seenIds.add(q.id)
      }

      // 4. Empty question string
      if (!q.question || q.question.trim() === '') {
        report(subject.id, L, 'EMPTY_QUESTION', `ID "${q.id}" has empty question`)
      }

      // 5. Empty questionHebrew (only if it's present but empty)
      if ('questionHebrew' in q && q.questionHebrew !== undefined && q.questionHebrew.trim() === '') {
        report(subject.id, L, 'EMPTY_QUESTION_HEBREW',
          `ID "${q.id}" has empty questionHebrew string`)
      }

      // 6. fill-blank: answer must be non-empty
      if (q.type === 'fill-blank') {
        if (!q.answer || q.answer.trim() === '') {
          report(subject.id, L, 'EMPTY_FILL_BLANK_ANSWER',
            `ID "${q.id}" fill-blank has empty/undefined answer`)
        }
      }

      // 7. multiple-choice checks
      if (q.type === 'multiple-choice') {
        // Must have ≥2 options
        if (!q.options || q.options.length < 2) {
          report(subject.id, L, 'TOO_FEW_OPTIONS',
            `ID "${q.id}" has ${q.options?.length ?? 0} options (need ≥ 2)`)
        }

        // Answer must case-insensitively match at least one option
        if (q.options && q.options.length > 0) {
          const answerLower = q.answer.toLowerCase()
          const match = q.options.some(o => o.toLowerCase() === answerLower)
          if (!match) {
            report(subject.id, L, 'ANSWER_NOT_IN_OPTIONS',
              `ID "${q.id}" answer "${q.answer}" not found in options [${q.options.join(', ')}]`)
          }
        }

        // Empty answer
        if (!q.answer || q.answer.trim() === '') {
          report(subject.id, L, 'EMPTY_MC_ANSWER',
            `ID "${q.id}" multiple-choice has empty/undefined answer`)
        }
      }
    }
  }

  // 8. Missing levels (should have levels 1, 2, 3)
  const levelNums = subject.levels.map(l => l.level).sort()
  if (JSON.stringify(levelNums) !== JSON.stringify([1, 2, 3])) {
    report(subject.id, 0, 'MISSING_LEVELS',
      `Has levels [${levelNums.join(', ')}] — expected [1, 2, 3]`)
  }
}

// ── print report ───────────────────────────────────────────────────────────────

console.log('\n══════════════════════════════════════════════════════════')
console.log('  SMALL TALK — CONTENT VALIDATION REPORT')
console.log(`  Checked: ${SUBJECTS.length} subjects`)
console.log('══════════════════════════════════════════════════════════\n')

if (issues.length === 0) {
  console.log('✅  No issues found! All content is valid.\n')
} else {
  console.log(`⚠️  Found ${issues.length} issue(s):\n`)

  // Group by subject
  const bySubject = new Map<string, Issue[]>()
  for (const iss of issues) {
    const key = iss.subjectId
    if (!bySubject.has(key)) bySubject.set(key, [])
    bySubject.get(key)!.push(iss)
  }

  for (const [subjectId, subIssues] of bySubject) {
    console.log(`📚 ${subjectId.toUpperCase()} (${subIssues.length} issue${subIssues.length > 1 ? 's' : ''})`)
    for (const iss of subIssues) {
      const lvlLabel = iss.level === 0 ? 'ALL' : `L${iss.level}`
      console.log(`   [${lvlLabel}] [${iss.issue}] ${iss.details}`)
    }
    console.log()
  }
}

console.log('══════════════════════════════════════════════════════════\n')
process.exit(issues.length > 0 ? 1 : 0)
