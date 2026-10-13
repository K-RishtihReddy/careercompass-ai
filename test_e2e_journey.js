// CareerCompass AI - Complete End-to-End Journey Automated Test Suite
const http = require('http');

function request(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const parsed = data ? JSON.parse(data) : {};
          resolve({ status: res.statusCode, headers: res.headers, body: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, headers: res.headers, raw: data });
        }
      });
    });

    req.on('error', reject);

    if (postData) {
      req.write(typeof postData === 'string' ? postData : JSON.stringify(postData));
    }
    req.end();
  });
}

async function runTests() {
  console.log('====================================================');
  console.log('🚀 CareerCompass AI - Automated End-to-End Test Suite');
  console.log('====================================================\n');

  let passed = 0;
  let total = 0;

  function assert(condition, testName, details = '') {
    total++;
    if (condition) {
      console.log(`✅ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${testName} - ${details}`);
    }
  }

  // 1. Health check
  const healthRes = await request({
    host: 'localhost',
    port: 8080,
    path: '/api/health',
    method: 'GET',
  });
  assert(healthRes.status === 200 && healthRes.body.success, 'Backend Health Check API (/api/health)');

  // 2. Public Catalog Jobs
  const jobsRes = await request({
    host: 'localhost',
    port: 8080,
    path: '/api/jobs',
    method: 'GET',
  });
  assert(jobsRes.status === 200 && jobsRes.body.data.length >= 10, 'Public Jobs Catalog (/api/jobs)', `Found: ${jobsRes.body?.data?.length}`);

  // 3. Register New User
  const testEmail = `candidate_${Date.now()}@test.com`;
  const regRes = await request(
    {
      host: 'localhost',
      port: 8080,
      path: '/api/auth/register',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    },
    {
      fullName: 'Vikram Mehta',
      email: testEmail,
      password: 'Password@123',
      educationLevel: "Bachelor's",
      degree: 'B.Tech in Computer Science',
      graduationYear: 2025,
      experienceLevel: 'Fresher',
    }
  );
  assert(regRes.status === 201 && regRes.body.data?.token, 'User Registration with BCrypt & JWT (/api/auth/register)');

  const userToken = regRes.body.data?.token;

  // 4. Login with registered user
  const loginRes = await request(
    {
      host: 'localhost',
      port: 8080,
      path: '/api/auth/login',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    },
    {
      email: testEmail,
      password: 'Password@123',
    }
  );
  assert(loginRes.status === 200 && loginRes.body.data?.user?.email === testEmail, 'User Authentication Login (/api/auth/login)');

  // 5. Get current profile
  const profileRes = await request({
    host: 'localhost',
    port: 8080,
    path: '/api/users/me',
    method: 'GET',
    headers: { Authorization: `Bearer ${userToken}` },
  });
  assert(profileRes.status === 200 && profileRes.body.data?.fullName === 'Vikram Mehta', 'Get User Profile (/api/users/me)');

  // 6. Submit Assessment with Skills
  const assessRes = await request(
    {
      host: 'localhost',
      port: 8080,
      path: '/api/assessment/submit',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    },
    {
      skills: [
        { name: 'Java', proficiency: 'ADVANCED' },
        { name: 'Spring Boot', proficiency: 'INTERMEDIATE' },
        { name: 'React', proficiency: 'INTERMEDIATE' },
        { name: 'MySQL', proficiency: 'INTERMEDIATE' },
      ],
      softSkills: ['Problem Solving', 'Communication'],
      interests: ['Full Stack Development', 'Backend Engineering'],
      educationLevel: "Bachelor's",
      degree: 'Computer Science',
      experienceLevel: 'Fresher',
      preferredLocation: 'Bangalore, India',
      desiredRole: 'Java Full Stack Developer',
      careerGoals: 'Eager to build high-scale microservices and cloud backends.',
    }
  );
  assert(
    assessRes.status === 200 && assessRes.body.data && assessRes.body.data.length > 0,
    'Submit Skills Assessment & Profile Update (/api/assessment/submit)'
  );

  const topRec = assessRes.body.data[0];
  assert(
    topRec.matchPercentage >= 75 && topRec.matchingSkills.includes('Java'),
    'Rule-Based Recommendation Engine Scored Top Role (>=75% for Java+Spring+React)',
    `Top match: ${topRec.title} - ${topRec.matchPercentage}%`
  );

  // 7. Get Recommendations
  const recsRes = await request({
    host: 'localhost',
    port: 8080,
    path: '/api/recommendations',
    method: 'GET',
    headers: { Authorization: `Bearer ${userToken}` },
  });
  assert(recsRes.status === 200 && recsRes.body.data.length > 0, 'Fetch User Recommendations (/api/recommendations)');

  // 8. Skill Gap Analysis for Target Role
  const gapRes = await request({
    host: 'localhost',
    port: 8080,
    path: '/api/recommendations/skill-gap?targetRole=Java%20Full%20Stack%20Developer',
    method: 'GET',
    headers: { Authorization: `Bearer ${userToken}` },
  });
  assert(
    gapRes.status === 200 && gapRes.body.data?.alreadyHaveSkills?.length > 0,
    'Skill Gap Analysis for Target Role (/api/recommendations/skill-gap)'
  );

  // 9. Save Job
  const saveRes = await request({
    host: 'localhost',
    port: 8080,
    path: `/api/jobs/1/save`,
    method: 'POST',
    headers: { Authorization: `Bearer ${userToken}` },
  });
  assert(saveRes.status === 200, 'Save / Bookmark Job (/api/jobs/1/save)');

  // 10. Get Saved Jobs
  const savedListRes = await request({
    host: 'localhost',
    port: 8080,
    path: `/api/jobs/saved`,
    method: 'GET',
    headers: { Authorization: `Bearer ${userToken}` },
  });
  assert(savedListRes.status === 200 && savedListRes.body.data?.length === 1, 'Retrieve Saved Jobs List (/api/jobs/saved)');

  // 11. Unsave Job
  const unsaveRes = await request({
    host: 'localhost',
    port: 8080,
    path: `/api/jobs/1/save`,
    method: 'DELETE',
    headers: { Authorization: `Bearer ${userToken}` },
  });
  assert(unsaveRes.status === 200, 'Unsave / Remove Bookmarked Job (/api/jobs/1/save)');

  // 12. Career Roadmap
  const roadmapRes = await request({
    host: 'localhost',
    port: 8080,
    path: '/api/career-roadmap?role=Java%20Full%20Stack%20Developer',
    method: 'GET',
    headers: { Authorization: `Bearer ${userToken}` },
  });
  assert(roadmapRes.status === 200 && roadmapRes.body.data?.length >= 5, 'Get Career Roadmap Milestones (/api/career-roadmap)');

  // 13. Toggle Roadmap Progress
  const milestoneId = roadmapRes.body.data[0].id;
  const toggleRes = await request({
    host: 'localhost',
    port: 8080,
    path: `/api/career-roadmap/${milestoneId}/toggle`,
    method: 'POST',
    headers: { Authorization: `Bearer ${userToken}` },
  });
  assert(toggleRes.status === 200 && toggleRes.body.data?.isCompleted === true, 'Toggle Milestone Progress (/api/career-roadmap/:id/toggle)');

  // 14. Admin Login
  const adminLoginRes = await request(
    {
      host: 'localhost',
      port: 8080,
      path: '/api/auth/login',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    },
    {
      email: 'admin@careercompass.ai',
      password: 'Admin@123',
    }
  );
  assert(adminLoginRes.status === 200 && adminLoginRes.body.data?.user?.role === 'ROLE_ADMIN', 'Administrator Login (/api/auth/login)');

  const adminToken = adminLoginRes.body.data?.token;

  // 15. Admin Stats
  const adminStatsRes = await request({
    host: 'localhost',
    port: 8080,
    path: '/api/admin/stats',
    method: 'GET',
    headers: { Authorization: `Bearer ${adminToken}` },
  });
  assert(adminStatsRes.status === 200 && adminStatsRes.body.data?.totalJobs >= 10, 'Admin Statistics API (/api/admin/stats)');

  // 16. Admin Users List
  const adminUsersRes = await request({
    host: 'localhost',
    port: 8080,
    path: '/api/admin/users',
    method: 'GET',
    headers: { Authorization: `Bearer ${adminToken}` },
  });
  assert(adminUsersRes.status === 200 && adminUsersRes.body.data?.length >= 2, 'Admin Users Management (/api/admin/users)');

  // 17. Admin Create Job
  const createJobRes = await request(
    {
      host: 'localhost',
      port: 8080,
      path: '/api/admin/jobs',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`,
      },
    },
    {
      title: 'Senior Distributed Systems Architect',
      company: 'ScaleCraft Cloud',
      location: 'Hyderabad, India',
      jobType: 'Full-Time',
      experienceLevel: 'Senior',
      salaryRange: '₹22 - 30 LPA',
      description: 'Design distributed stream processing architectures with Kafka and Kubernetes.',
      applyUrl: 'https://careers.example.com/scalecraft/architect',
      isSample: true,
      requiredSkillNames: ['Java', 'Kafka', 'Kubernetes'],
      optionalSkillNames: ['Docker', 'AWS'],
    }
  );
  assert(createJobRes.status === 201 && createJobRes.body.data?.id, 'Admin Create Job Listing (/api/admin/jobs)');

  const createdJobId = createJobRes.body.data?.id;

  // 18. Admin Update Job
  const updateJobRes = await request(
    {
      host: 'localhost',
      port: 8080,
      path: `/api/admin/jobs/${createdJobId}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`,
      },
    },
    {
      title: 'Principal Distributed Systems Architect',
      company: 'ScaleCraft Cloud',
      location: 'Hyderabad, India',
      jobType: 'Full-Time',
      experienceLevel: 'Senior',
      salaryRange: '₹25 - 35 LPA',
      description: 'Updated architecture responsibilities.',
      applyUrl: 'https://careers.example.com/scalecraft/architect',
      isSample: true,
      requiredSkillNames: ['Java', 'Kafka', 'Kubernetes'],
      optionalSkillNames: ['Docker'],
    }
  );
  if (updateJobRes.status !== 200 || updateJobRes.body.data?.title !== 'Principal Distributed Systems Architect') {
    console.log('DEBUG updateJobRes:', JSON.stringify(updateJobRes));
  }
  assert(updateJobRes.status === 200 && updateJobRes.body.data?.title === 'Principal Distributed Systems Architect', 'Admin Update Job Listing (/api/admin/jobs/:id)');

  // 19. Admin Delete Job
  const deleteJobRes = await request({
    host: 'localhost',
    port: 8080,
    path: `/api/admin/jobs/${createdJobId}`,
    method: 'DELETE',
    headers: { Authorization: `Bearer ${adminToken}` },
  });
  assert(deleteJobRes.status === 200, 'Admin Delete Job Listing (/api/admin/jobs/:id)');

  // 20. Frontend Live Server Check
  const frontendRes = await request({
    host: 'localhost',
    port: 5173,
    path: '/',
    method: 'GET',
  });
  assert(frontendRes.status === 200 && frontendRes.raw?.includes('<title>CareerCompass AI'), 'Vite Frontend Live Server (http://localhost:5173)');

  console.log('\n====================================================');
  console.log(`📊 Result: ${passed}/${total} Tests Passed (${Math.round((passed / total) * 100)}%)`);
  console.log('====================================================');

  if (passed === total) {
    console.log('🎉 ALL INTEGRATION TESTS PASSED PERFECTLY!');
  } else {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Test run failed with error:', err);
  process.exit(1);
});
