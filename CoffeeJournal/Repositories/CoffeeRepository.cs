using System;
using System.Data;
using CoffeeJournal.Models;
using Dapper;
using Microsoft.Data.Sqlite;

namespace CoffeeJournal.Repositories;

public interface ICoffeeRepository
{
    List<CoffeeRecord> Get();
    CoffeeRecord GetById(int id);
    void Add(CoffeeRecord record);
    void Delete(int id);
    void Update(CoffeeRecord record);
}

public class CoffeeRepository: ICoffeeRepository
{
    private readonly IConfiguration _config;
    public CoffeeRepository(IConfiguration config)
    {
        _config = config;
    }

    public List<CoffeeRecord> Get()
    {
        using (IDbConnection connection = new SqliteConnection(_config.GetConnectionString("ConnectionString")))
               {
                   var query = 
                       @"SELECT * FROM records";
                   var allTransactions = connection.Query<CoffeeRecord>(query);

                   return allTransactions.ToList();
               }
    }

    public CoffeeRecord GetById(int id)
    {
        using (IDbConnection connection = new SqliteConnection(_config.GetConnectionString("ConnectionString")))
        {
            var query =
                @"SELECT * FROM records WHERE Id = @Id";
            var record = connection.QuerySingle<CoffeeRecord>(query, new { Id = id });

            return record;
        }

    }

    public void Add(CoffeeRecord record)
    {
        using (IDbConnection connection = new SqliteConnection(_config.GetConnectionString("ConnectionString")))
        {
            var sql =
                "INSERT INTO records (Type, Bean, Location, DateCreated, NumShots, Score, Price) Values(@Type, @Bean, @Location, @DateCreated, @NumShots, @Score, @Price)";
            connection.Execute(sql, record);
        }
    }
    
    public void Delete(int id)
    {
        using (IDbConnection connection = new SqliteConnection(_config.GetConnectionString("ConnectionString")))
        {
            var sql =
                @"DELETE FROM records WHERE Id = @id";
            connection.Execute(sql, new { id });
        }
    }

    public void Update(CoffeeRecord record)
    {
        using (IDbConnection connection = new SqliteConnection(_config.GetConnectionString("ConnectionString")))
        {
            var sql =
                "UPDATE records SET Type = @Type, Bean = @Bean, Location = @Location, DateCreated = @DateCreated, Score = @Score, NumShots = @NumShots, Price = @Price WHERE Id = @Id";
            connection.Execute(sql, record);
        }
    }
}