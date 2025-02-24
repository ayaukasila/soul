async function fetchMoodStats(range = '1W') {
    try {
      const response = await fetch(`/api/get_mood_stats?range=${range}`);
      const data = await response.json();
      return data; 
    } catch (error) {
      console.error("Error fetching mood stats:", error);
      return {};
    }
  }
  
  async function renderMoodChart(range = '1W') {
    const ctx = document.getElementById("moodChart").getContext("2d");
  
    const moodStats = await fetchMoodStats(range);
    console.log("Mood stats:", moodStats);
  
    const labels = Object.keys(moodStats);      
    const values = Object.values(moodStats);    
  
    if (window.moodChartInstance) {
      window.moodChartInstance.destroy();
    }
  
    window.moodChartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [{
          label: "Mood Frequency",
          data: values,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderWidth: 2,
          fill: true
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  

  document.addEventListener("DOMContentLoaded", () => {
 
    renderMoodChart("1W");

    document.querySelectorAll(".mood-time-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const range = btn.getAttribute("data-range");
        renderMoodChart(range);
      });
    });
  });
  