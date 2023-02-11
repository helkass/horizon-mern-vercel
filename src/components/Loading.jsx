const Loading = ({ styledCustom }) => {
   return (
      <div
         className={`${styledCustom} flex h-screen justify-center items-center z-20 bg-white/50 backdrop-blur-60`}>
         <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-dashed border-yellow-400 border-4 rounded-full"
            role="status"></div>
      </div>
   );
};

export default Loading;
